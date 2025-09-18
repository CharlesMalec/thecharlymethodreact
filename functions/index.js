const functions = require("firebase-functions");
const stripeKey = "sk_test_51S8FmaPdI83u7wtyY6TzzaZMy9dZZPoC7SMR6LGe0Wj1bMBvn" +
  "s81TO0eGg9tXXYnHzPM8r29vBBd86TEDMorcNHC00yjQ4hPz8";
const stripe = require("stripe")(stripeKey);
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price: "price_1S8GsUPdI83u7wtyUOKX8rXZ",
          quantity: 1,
        }],
        mode: "subscription",
        success_url: "https://thecharlymethod.com/success",
        cancel_url: "https://thecharlymethod.com/payment",
        customer_email: req.query.email,
      });
      res.json({id: session.id});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });
});

exports.stripeWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = "whsec_3baaa2a8d259a6282f6cc8c8e0ebb81eb8986e7f91bf39b44b1eb8da8215ce04";

    try {
      const event = stripe.webhooks.constructEvent(
          req.rawBody,
          sig,
          webhookSecret,
      );
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userEmail = session.customer_email;
        const userDoc = await admin.firestore()
            .collection("users")
            .where("email", "==", userEmail)
            .get();
        if (!userDoc.empty) {
          await userDoc.docs[0].ref.update({premium: true});
        }
      }
      res.status(200).send("Received");
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });
});
