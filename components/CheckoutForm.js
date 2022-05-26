import React, { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Context } from "../context/context";

export default function CheckoutForm(paymentIntent) {
  const context = useContext(Context);
  const [locAmount, setLocAmount] = useState("300");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleAmount = async (val) => {
    setLocAmount(val);
    fetch("api/stripe_intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: val * 100,
        payment_intent_id: paymentIntent.paymentIntent,
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("not loaded");
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://followrush.vercel.app/order",
        receipt_email: context.orderDetails.email,
        payment_method_data: {
          billing_details: {
            name: context.orderDetails.email,
          },
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="m-auto w-[80%]"
      >
        <PaymentElement id="payment-element" />
        <button
          className="elements-style-background mt-10 w-full bg-[#ffce1e] p-4  rounded-md"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          {/* <span id="button-text " className=" "> */}
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          {/* </span> */}
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="text-red-500">{message}</div>}
      </form>
    </>
  );
}
