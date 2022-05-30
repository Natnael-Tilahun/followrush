import React, { useState, useEffect, useContext } from "react";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Context } from "../context/context";
import en from "../data/en.json";

// const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const context = useContext(Context);
  const { checkoutPage } = en;
  const [processId, setProcessId] = useState(null);
  const [processToken, setProcessToken] = useState("");
  const [url, setUrl] = useState("");


  const [transactionId, setTransactionId] = useState(null);
  const [transactionToken, setTransactionToken] = useState("");

  // var url = "";
  const pageCode=process.env.pageCode;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
    const linkToPage = `https://www.instagram.com/${context.orderDetails.username}/`;
    fetch("api/meshulam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: process.env.userId,
        pageCode: pageCode,
        sum: context.orderDetails.totalPrice * 100,
        successUrl: "https://followrush.vercel.app/order",
        cancelUrl: "https://followrush.vercel.app",
        pageField: {service:context.orderDetails.service,link:context.orderDetails.linkToPage,quantity:context.orderDetails.quantity,email:context.orderDetails.email},
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProcessId(data.processId), setProcessToken(data.processToken);
        setUrl(data.url);
        sessionStorage.setItem("processId", data.processId);
        sessionStorage.setItem("processToken", data.processToken);
        sessionStorage.setItem("url", data.url);
        alert(url)
        console.log(url);
      });
  }, []);

  return (
    <div className="w-full h-full lg:w-[80%] md:h-[90%] rounded-md drop-shadow-md grid lg:grid-cols-3">
      <div className="m-10 flex h-[90%] md:h-[85%] flex-col items-center lg:col-span-2 bg-white rounded-md">
        <h1 className="text-2xl bold mb-4 mt-4 text-center">
          {checkoutPage.hero_label}
        </h1>
        {!processId && !processToken && (
          <div className="h-full w-2/3">
            <iframe
              src="https://sandbox.meshulam.co.il/checkout?l=9abea7d2f0c75b90a6005a1224"
              className="bg-transparent z-50 scroll-auto border-0 p-0"
              width="100%"
              height="73%"
            ></iframe>
            <CheckoutForm processId={processId} processToken={processToken} />
            {/* </iframe> */}
          </div>
        )}
      </div>
      <div className="m-10 h-[90%] md:h-[80%] flex flex-col text-center items-center col-span-1 bg-white rounded-md">
        <div className="m-6 flex flex-col h-full justify-between pt-3">
          <div className="space-y-6">
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
            <p className="font-semibold pt-3">{checkoutPage.total_label}</p>
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
