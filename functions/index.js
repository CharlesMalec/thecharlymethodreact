// --- v2 imports ---
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const Stripe = require("stripe");

// init Firebase Admin
admin.initializeApp();

// Helper to build a Stripe client from the secret
function makeStripe() {
  return new Stripe(process.env.STRIPE_SECRET, { apiVersion: "2024-06-20" });
}

/**
 * Create Checkout Session (subscription)
 * - Reads STRIPE_SECRET and STRIPE_PRICE from v2 Secrets
 */
exports.createCheckoutSession = onRequest(
  {
    region: "us-central1",
    cors: true, // allows browser calls; adjust to specific origin later
    secrets: ["STRIPE_SECRET", "STRIPE_PRICE"],
  },
  async (req, res) => {
    try {
      const stripe = makeStripe();
      const { uid, email } = req.body || {};
      if (!uid || !email) return res.status(400).json({ error: "uid and email required" });
      // 1) Retrouver ou créer un customer
      const list = await stripe.customers.list({ email, limit: 1 });
      const customer = list.data[0]?
      await stripe.customers.update(list.data[0].id, { metadata: { uid } }):
      await stripe.customers.create({ email, metadata: { uid } });
      // 2) Créer la session en taggant le uid
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: process.env.STRIPE_PRICE, quantity: 1 }],
        customer: customer.id,
        metadata: { uid },
        subscription_data: { metadata: { uid } },
        success_url: "https://thecharlymethod.com/success",
        cancel_url: "https://thecharlymethod.com/payment",
      });
      res.json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Stripe Webhook (raw body, no JSON parsing before verification)
 * - Reads STRIPE_SECRET and STRIPE_WHSEC from v2 Secrets
 */
exports.stripeWebhook = onRequest(
  {
    region: "us-central1",
    // Do NOT set cors here; Stripe doesn't need CORS. Keep body unmodified.
    secrets: ["STRIPE_SECRET", "STRIPE_WHSEC"],
  },
  async (req, res) => {
    const stripe = makeStripe();

    let event;
    try {
      const sig = req.headers["stripe-signature"];
      // req.rawBody is available in v2
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WHSEC
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          let uid = session?.metadata?.uid || null;
          // Fallback 1: via subscription metadata
          if (!uid && session.subscription) {
            const sub = await stripe.subscriptions.retrieve(session.subscription);
            uid = sub?.metadata?.uid || null;
          }
          // Fallback 2: via customer metadata
          if (!uid && session.customer) {
            const cust = await stripe.customers.retrieve(session.customer);
            uid = cust?.metadata?.uid || null;
          }
          if (uid) {
            await admin.firestore().collection("users").doc(uid).set(
              { premium: true, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
              { merge: true }
            );
          } else {
          // Dernier recours: email normalisé (si tu as ce champ dans tes docs)
          const userEmail = (session.customer_details?.email || session.customer_email || "").toLowerCase();
          if (userEmail) {
            const snap = await admin.firestore()
            .collection("users")
            .where("emailLower", "==", userEmail)
            .limit(1).get();
            if (!snap.empty) {
              await snap.docs[0].ref.update({ premium: true, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
            }
          }
        }
          break;
        }
        case "customer.subscription.deleted": {
          // TODO: look up your user from the Stripe customer and set premium=false
          break;
        }
        case "invoice.paid":
        case "customer.subscription.updated":
          // Optional: sync subscription status/periods
          break;
        default:
          // ignore others
          break;
      }
      res.json({ received: true });
    } catch (err) {
      console.error("⚠️ Webhook handler error:", err);
      res.status(500).send("Webhook handler failed");
    }
  }
);
