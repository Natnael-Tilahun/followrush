import React, { useEffect, useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { Context } from "../context/context";

function Order() {
  const context = useContext(Context);
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestOrder = async (orderDetails) => {
    try {
      const data = await fetch("api/smm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          serviceId: orderDetails.serviceId,
          linkToPage: orderDetails.linkToPage,
          quantity: orderDetails.quantity,
          payment_intent_id: orderDetails.payment_intent_id,
        }),
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //Grab the client secret from url params
    const payment_intent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );
    if (!payment_intent) {
      return;
    }

    fetch("api/stripe_intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_intent_id: payment_intent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.status) {
          case "succeeded":
            try {
              requestOrder({
                ...data.metadata,
                payment_intent_id: payment_intent,
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log(res);
                  if (res.status === "failed") {
                    setMessage(`an Error occurred "${res.error}"`);
                  } else {
                    setMessage(`Payment succeeded! ${JSON.stringify(res)} `);
                  }
                });
            } catch (error) {
              setMessage(`an Error occurred ${error}`);
            }
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
  }, []);

  const handelClick = () => {
    router.push("/");
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-10 w-96 h-96 rounded-md drop-shadow-md flex flex-col justify-between">
        <p>{message}</p>
        <button
          onClick={() => handelClick()}
          className="bg-[#ffce1e] p-4 w-full mt-6 rounded-md "
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Order;
