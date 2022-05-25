import React, { useState, useEffect, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Context } from "../context/context";
import en from "../data/en.json";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const context = useContext(Context);
  const { checkoutPage } = en;
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
    const linkToPage = `https://www.instagram.com/${context.orderDetails.username}/`;
  //   fetch("api/stripe_intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       amount: context.orderDetails.totalPrice * 100,
  //       payment_intent_id: "",
  //       serviceId: context.orderDetails.planSelected.serviceCode,
  //       linkToPage,
  //       quantity: context.orderDetails.planSelected.quantity,
  //       email: context.orderDetails.email,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setClientSecret(data.client_secret), setPaymentIntent(data.id);
  //       alert(data.id)
  //     });
  // }, []);

  fetch(`https://www.instagram.com/${context.orderDetails.username}/?__a=1`, { "mode": 'no-cors'})
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      alert(data)
    });
}, []);

  const appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full h-full lg:w-[80%] lg:h-[70%] rounded-md drop-shadow-md grid lg:grid-cols-3">
      <div className="m-10 flex h-[90%] lg:h-[80%] flex-col items-center lg:col-span-2 bg-white rounded-md">
        <h1 className="text-2xl bold mb-4 mt-4 text-center">
          {checkoutPage.hero_label}
        </h1>
        {clientSecret && (
          <Elements options={options} stripe={stripe}>
            <CheckoutForm
              paymentIntent={paymentIntent}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      </div>
      <div className="m-10 h-[90%] lg:h-[80%] flex flex-col text-center items-center col-span-1 bg-white rounded-md">
        <div className="m-6 flex flex-col h-full justify-between ">
          <div className="space-y-8">
            <div>
              <p className="font-semibold">{checkoutPage.username_label}</p>
              <p className="text-gray-600">{context.orderDetails.username}</p>
            </div>
            <div>
              <p className="font-semibold">Email {checkoutPage.email_label}</p>
              <p className="text-gray-600">{context.orderDetails.email}</p>
            </div>
            <div>
              <p className="font-semibold">{checkoutPage.plan_label}</p>
              <p className="text-gray-600">
                {context.orderDetails.planSelected.label}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold">{checkoutPage.total_label}</p>
            <p className="text-gray-600">
              {context.orderDetails.totalPrice} {context.orderDetails.currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
