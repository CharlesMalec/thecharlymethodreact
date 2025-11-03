import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Stripe from "stripe";
import admin from "firebase-admin";

if (!admin.apps.length) admin.initializeApp();

const STRIPE_SECRET = defineSecret("STRIPE_SECRET");
const STRIPE_PRICE_ID = defineSecret("STRIPE_PRICE_ID");        // ex: price_xxx
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

// Utilitaire Firestore
const setPremium = async (uid, value, extra = {}) => {
  await admin.firestore().collection('users').doc(uid).set(
    { premium: value, updatedAt: admin.firestore.FieldValue.serverTimestamp(), ...extra },
    { merge: true }
  );
};

// ============ CREATE CHECKOUT SESSION ============
export const createCheckoutSession = onRequest(
  { cors: true, secrets: [STRIPE_SECRET, STRIPE_PRICE_ID] },
  async (req, res) => {
    try {
      if (req.method === 'OPTIONS') return res.status(204).send('');
      if (req.method !== 'POST') return res.status(405).send('Method not allowed');

      const { uid, email, priceId } = req.body || {};
      if (!uid || !email) return res.status(400).json({ error: 'uid and email required' });

      const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: '2024-06-20' });

      // Retrouver ou créer le customer
      const list = await stripe.customers.list({ email, limit: 1 });
      const customer = list.data.length
        ? await stripe.customers.update(list.data[0].id, { metadata: { uid } })
        : await stripe.customers.create({ email, metadata: { uid } });

      // Créer la session d'abonnement
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customer.id,
        line_items: [{ price: priceId || STRIPE_PRICE_ID.value(), quantity: 1 }],
        metadata: { uid },
        subscription_data: { metadata: { uid } },
        allow_promotion_codes: true,
        success_url: 'https://thecharlymethod.com/payment?success=true',
        cancel_url: 'https://thecharlymethod.com/payment?canceled=true',
      });

      return res.json({ id: session.id });
    } catch (e) {
      console.error('createCheckoutSession error', e);
      return res.status(500).json({ error: 'Checkout creation failed' });
    }
  }
);

// ============ STRIPE WEBHOOK ============
export const stripeWebhook = onRequest(
  { cors: true, secrets: [STRIPE_SECRET, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: '2024-06-20' });
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      // Firebase v2: req.rawBody est disponible
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const s = event.data.object;
          let uid = s?.metadata?.uid || null;
          let subscriptionId = s.subscription || null;
          const customerId = s.customer || null;

          // Fallback: aller chercher le uid dans la subscription
          if (!uid && subscriptionId) {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            uid = sub?.metadata?.uid || null;
          }

          if (uid) {
            await setPremium(uid, true, {
              stripeCustomerId: customerId || null,
              stripeSubscriptionId: subscriptionId || null,
              subscriptionStatus: 'active',
              premiumSource: 'checkout.session.completed',
            });
          }
          break;
        }

        case 'customer.subscription.updated': {
          const sub = event.data.object;
          const uid = sub?.metadata?.uid || null;
          const isActive = ['active', 'trialing', 'past_due'].includes(sub.status);
          if (uid) {
            await setPremium(uid, isActive, {
              stripeSubscriptionId: sub.id,
              subscriptionStatus: sub.status,
              premiumSource: 'subscription.updated',
            });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const sub = event.data.object;
          const uid = sub?.metadata?.uid || null;
          if (uid) {
            await setPremium(uid, false, {
              stripeSubscriptionId: sub.id,
              subscriptionStatus: sub.status,
              premiumSource: 'subscription.deleted',
            });
          }
          break;
        }

        default:
          // autres events ignorés
          break;
      }

      return res.json({ received: true });
    } catch (err) {
      console.error('Webhook handler error', err);
      return res.status(500).send('Webhook handler error');
    }
  }
);

// ============ BILLING PORTAL ============
export const createPortalSession = onRequest(
  { cors: true, secrets: [STRIPE_SECRET] },
  async (req, res) => {
    try {
      if (req.method === 'OPTIONS') return res.status(204).send('');
      if (req.method !== 'POST') return res.status(405).send('Method not allowed');

      const authHeader = req.headers.authorization || '';
      const idToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
      if (!idToken) return res.status(401).json({ error: 'Missing Authorization' });

      const decoded = await admin.auth().verifyIdToken(idToken);
      const uid = decoded.uid;

      const snap = await admin.firestore().doc(`users/${uid}`).get();
      const data = snap.data() || {};
      const customerId = data.stripeCustomerId;
      if (!customerId) return res.status(400).json({ error: 'No Stripe customer on user' });

      const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: '2024-06-20' });
      const portal = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: 'https://thecharlymethod.com/payment',
      });

      return res.json({ url: portal.url });
    } catch (e) {
      console.error('createPortalSession error', e);
      return res.status(500).json({ error: 'Could not open billing portal' });
    }
  }
);
