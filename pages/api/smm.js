import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const handler = async (req, res) => {
  const {
    action,
    serviceId,
    linkToPage,
    quantity,
    _runs,
    _interval,
    payment_intent_id,
  } = req.body;
  try {
    //  retrieve the paymentIntent
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    // If a paymentIntent is retrieved and it's already ordered then return
    if (current_intent.metadata.status) {
      res.status(200).json({
        statusCode: 200,
        message: `already ordered for this payment session order:${current_intent.metadata.status}`,
      });
      return;
      // else make an order
    } else {
      fetch("https://smmfollows.com/api/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: process.env.SMM_SECRET_KEY,
          action: "add",
          service: Number(serviceId),
          link: linkToPage,
          quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // if order succeed update the intent
          if (data.order) {
            stripe.paymentIntents
              .update(payment_intent_id, {
                metadata: { ...current_intent.metadata, status: data.order },
              })
              .then(() => {
                res.status(200).json(updated_intent);
                return;
              });
            // if order failed
          } else {
            res.status(500).json({ ...data, status: "failed", code: 500 });
          }
        });
    }
  } catch (e) {
    //Catch any error and return a status 500
    if (e.code !== "resource_missing") {
      const errorMessage =
        e instanceof Error ? e.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
      return;
    }
  }
};
export default handler;
