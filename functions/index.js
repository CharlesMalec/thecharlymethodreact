/* eslint-disable consistent-return */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");
const admin = require("firebase-admin");

if (!admin.apps.length) admin.initializeApp();

const STRIPE_SECRET = defineSecret("STRIPE_SECRET"); // sk_live_...
const STRIPE_PRICE_ID = defineSecret("STRIPE_PRICE_ID"); // price_xxx (LIVE)
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET"); // whsec_...

// ====== CORS ======
const ALLOWED_ORIGINS = new Set([
  "https://thecharlymethod.com", // prod
  "http://localhost:3000", // dev
  "http://127.0.0.1:3000",
]);

function setCors(res, origin) {
  let allow = "https://thecharlymethod.com";
  if (ALLOWED_ORIGINS.has(origin)) allow = origin;
  res.set("Access-Control-Allow-Origin", allow);
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
}

async function setPremium(uid, value, extra) {
  const payload = {
    premium: value,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (extra && typeof extra === "object") Object.assign(payload, extra);
  await admin.firestore().collection("users").doc(uid).set(payload, { merge: true });
}

// ====== helper: retrouver le uid depuis divers objets Stripe ======
async function resolveUidFromStripe(stripe, obj) {
  // 1) metadata.uid direct
  if (obj && obj.metadata && obj.metadata.uid) return obj.metadata.uid;

  // 2) via subscription si session
  if (obj && obj.subscription) {
    try {
      const sub = await stripe.subscriptions.retrieve(obj.subscription);
      if (sub && sub.metadata && sub.metadata.uid) return sub.metadata.uid;
      if (sub && sub.customer) obj.customer = sub.customer; // pour fallback 3
    } catch (err) {
      console.warn("resolveUidFromStripe: subscriptions.retrieve failed", err);
    }
  }

  // 3) via customer → mapping firestore → metadata → email
  if (obj && obj.customer) {
    const customerId = String(obj.customer);
    try {
      // mapping Firestore
      const mapSnap = await admin.firestore().collection("stripe_customers").doc(customerId).get();
      if (mapSnap.exists && mapSnap.data().uid) return mapSnap.data().uid;

      // metadata du customer
      const customer = await stripe.customers.retrieve(customerId);
      if (customer && customer.metadata && customer.metadata.uid) return customer.metadata.uid;

      // email → users.emailLower
      const email = customer && customer.email ? String(customer.email).toLowerCase() : "";
      if (email) {
        const userSnap = await admin.firestore()
          .collection("users").where("emailLower", "==", email).limit(1).get();
        if (!userSnap.empty) return userSnap.docs[0].id;
      }
    } catch (err) {
      console.warn("resolveUidFromStripe: customer lookup failed", err);
    }
  }

  return null;
}

// ====== CREATE CHECKOUT SESSION ======
exports.createCheckoutSession = onRequest(
  { cors: true, secrets: [STRIPE_SECRET, STRIPE_PRICE_ID] },
  async (req, res) => {
    const origin = req.headers.origin || "";
    setCors(res, origin);

    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    try {
      const body = req.body || {};
      const uid = body.uid;
      const email = body.email;
      const priceId = body.priceId;

      if (!uid || !email) return res.status(400).json({ error: "uid and email required" });

      const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: "2024-06-20" });

      // Customer (create or update) + metadata.uid
      const list = await stripe.customers.list({ email, limit: 1 });
      let customer;
      if (list.data.length > 0) {
        customer = await stripe.customers.update(list.data[0].id, { metadata: { uid } });
      } else {
        customer = await stripe.customers.create({ email, metadata: { uid } });
      }

      // mapping customer → uid pour les webhooks futurs (filet de sécu)
      await admin.firestore().collection("stripe_customers").doc(customer.id).set(
        { uid, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customer.id,
        line_items: [{ price: priceId || STRIPE_PRICE_ID.value(), quantity: 1 }],
        metadata: { uid },
        subscription_data: { metadata: { uid } },
        allow_promotion_codes: true,
        success_url: "https://thecharlymethod.com/payment?success=true",
        cancel_url: "https://thecharlymethod.com/payment?canceled=true",
      });

      return res.json({ id: session.id });
    } catch (e) {
      console.error("createCheckoutSession error", e);
      return res.status(500).json({ error: "Checkout creation failed" });
    }
  }
);

// ====== STRIPE WEBHOOK ======
exports.stripeWebhook = onRequest(
  { cors: true, secrets: [STRIPE_SECRET, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: "2024-06-20" });
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET.value());
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const s = event.data.object;
          const uid = await resolveUidFromStripe(stripe, s);
          const customerId = s ? s.customer : null;
          const subscriptionId = s ? s.subscription : null;

          // renforce le mapping
          if (uid && customerId) {
            await admin.firestore().collection("stripe_customers").doc(String(customerId)).set(
              { uid, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
              { merge: true }
            );
          }

          if (uid) {
            await setPremium(uid, true, {
              stripeCustomerId: customerId || null,
              stripeSubscriptionId: subscriptionId || null,
              subscriptionStatus: "active",
              premiumSource: "checkout.session.completed",
            });
          }
          break;
        }

        case "customer.subscription.updated": {
          const sub = event.data.object;
          const uid = await resolveUidFromStripe(stripe, sub);
          const status = sub ? sub.status : "canceled";
          const isActive = ["active", "trialing", "past_due"].includes(status);

          if (uid && sub && sub.customer) {
            await admin.firestore().collection("stripe_customers").doc(String(sub.customer)).set(
              { uid, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
              { merge: true }
            );
          }

          if (uid) {
            await setPremium(uid, isActive, {
              stripeSubscriptionId: sub.id,
              subscriptionStatus: status,
              premiumSource: "subscription.updated",
            });
          }
          break;
        }

        case "customer.subscription.deleted": {
          const sub = event.data.object;
          const uid = await resolveUidFromStripe(stripe, sub);
          if (uid) {
            await setPremium(uid, false, {
              stripeSubscriptionId: sub.id,
              subscriptionStatus: sub.status,
              premiumSource: "subscription.deleted",
            });
          }
          break;
        }

        default:
        // no-op
      }

      return res.json({ received: true });
    } catch (err) {
      console.error("Webhook handler error", err);
      return res.status(500).send("Webhook handler error");
    }
  }
);

// ====== CREATE BILLING PORTAL SESSION ======
exports.createPortalSession = onRequest(
  { secrets: [STRIPE_SECRET] },
  async (req, res) => {
    const origin = req.headers.origin || "";
    setCors(res, origin);

    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    try {
      // Auth Firebase
      const authHeader = req.headers.authorization || "";
      let idToken = null;
      if (authHeader.startsWith("Bearer ")) idToken = authHeader.substring(7);
      if (!idToken) return res.status(401).send("Missing Authorization");

      const decoded = await admin.auth().verifyIdToken(idToken);
      const uid = decoded.uid;
      const email = decoded.email ? String(decoded.email).toLowerCase() : "";

      // stripeCustomerId depuis Firestore → fallback lookup Stripe par email
      const userRef = admin.firestore().doc(`users/${uid}`);
      const snap = await userRef.get();
      const data = snap.data() || {};
      let customerId = data.stripeCustomerId || null;

      const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: "2024-06-20" });

      if (!customerId && email) {
        const list = await stripe.customers.list({ email, limit: 1 });
        if (list.data.length > 0) {
          customerId = list.data[0].id;
          await userRef.set({ stripeCustomerId: customerId }, { merge: true });
        }
      }

      if (!customerId) return res.status(400).send("No Stripe customer on user");

      // ⚠️ Le portail doit être configuré en LIVE dans Stripe (Settings → Billing → Customer portal → Save)
      const portal = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: "https://thecharlymethod.com/payment",
      });

      return res.json({ url: portal.url });
    } catch (e) {
      console.error("createPortalSession error", e && e.raw ? e.raw : e);
      return res.status(500).send((e && e.message) || "Server error creating billing portal");
    }
  }
);

// ====== SYNC PREMIUM (fallback manuel) ======
exports.syncPremium = onRequest(
  { secrets: [STRIPE_SECRET] },
  async (req, res) => {
    const origin = req.headers.origin || "";
    setCors(res, origin);
    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return res.status(405).send("Method not allowed");

    try {
      const authHeader = req.headers.authorization || "";
      const idToken = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
      if (!idToken) return res.status(401).send("Missing Authorization");

      const decoded = await admin.auth().verifyIdToken(idToken);
      const uid = decoded.uid;
      const email = (decoded.email || "").toLowerCase();

      const userRef = admin.firestore().doc(`users/${uid}`);
      const snap = await userRef.get();
      const data = snap.data() || {};
      let customerId = data.stripeCustomerId || null;

      const stripe = new Stripe(STRIPE_SECRET.value(), { apiVersion: "2024-06-20" });

      if (!customerId && email) {
        const list = await stripe.customers.list({ email, limit: 1 });
        if (list.data.length > 0) {
          customerId = list.data[0].id;
          await userRef.set({ stripeCustomerId: customerId }, { merge: true });
        }
      }

      if (!customerId) {
        await setPremium(uid, false, { subscriptionStatus: "none", premiumSource: "sync" });
        return res.json({ premium: false, reason: "no_customer" });
      }

      const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
      const activeLike = subs.data.find((s) => ["active", "trialing", "past_due"].includes(s.status));

      if (activeLike) {
        await setPremium(uid, true, {
          stripeSubscriptionId: activeLike.id,
          subscriptionStatus: activeLike.status,
          premiumSource: "sync",
        });
        return res.json({ premium: true, status: activeLike.status });
      }

      await setPremium(uid, false, { subscriptionStatus: "canceled", premiumSource: "sync" });
      return res.json({ premium: false, status: "canceled" });
    } catch (e) {
      console.error("syncPremium error", e);
      return res.status(500).send("Server error syncing premium");
    }
  }
);
