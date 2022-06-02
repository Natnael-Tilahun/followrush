import React, { useState, useEffect, useContext } from "react";
<<<<<<< HEAD
import CheckoutForm from "./CheckoutForm";
import { Context } from "../context/context";
import en from "../data/en.json";
import { PayPalButton } from "react-paypal-button-v2";
=======
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Context } from "../context/context";
import en from "../data/en.json";

// const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
>>>>>>> ed165ac8d1b6472f367b11f2e90cb4853e99bce8

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
<<<<<<< HEAD
  
        const amount = context.orderDetails.totalPrice * 100
        const payment_intent_id =  ""
        const serviceId = context.orderDetails.planSelected.serviceCode
        const link = linkToPage
        const quantity =  context.orderDetails.planSelected.quantity
        const email = context.orderDetails.email

  }, []);


  return (
    <div className="w-full h-full lg:w-[85%] md:h-[90%] rounded-md drop-shadow-md grid lg:grid-cols-3">
      <div className="m-10 flex h-[95%] md:h-[90%] flex-col items-center lg:col-span-2 bg-white rounded-md ">
        <h1 className="text-2xl bold mb-10 mt-5 md:pt-10 text-center font-semibold px-5">
          {checkoutPage.hero_label}
        </h1>
        <div className="w-2/3 pt-8 md:pt-8 ">
        <PayPalButton
        amount={context.orderDetails.totalPrice}
        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        billingAddress="No"
        options={{
          clientId: "AYxF7hhglpGctrmdbqH7Iz9Ppfu1UDVVROTFNWZVmaIv_ZlG2LbmGcPNeg099qp6-hD7SOXCt32XWDwX"
        }}
    

        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID
            })
            
          });
        }}
      />
=======
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
>>>>>>> ed165ac8d1b6472f367b11f2e90cb4853e99bce8
      </div>
      </div>
      <div className="m-10 h-[100%] md:h-[85%] flex flex-col text-center items-center col-span-1 bg-white rounded-md">
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


{/* <div id="smart-button-container">
      <div style="text-align: center;">
        <div style="margin-bottom: 1.25rem;">
          <p>Instagram followers</p>
          <select id="item-options"><option value="1000" price="2.5">1000 - 2.5 ILS</option><option value="2000" price="5">2000 - 5 ILS</option><option value="5000" price="10">5000 - 10 ILS</option><option value="10000" price="20">10000 - 20 ILS</option><option value="15000" price="25">15000 - 25 ILS</option><option value="20000" price="35">20000 - 35 ILS</option></select>
          <select style="visibility: hidden" id="quantitySelect"></select>
        </div>
      <div id="paypal-button-container"></div>
      </div>
    </div>
    <script src="https://www.paypal.com/sdk/js?client-id=AXD4rXJUcpvdZAd00sw_BVrSvf3oSqfC6wyRXoD2cyROBx1zXfC9Om76zZbdT1B1RL7wHqwMvsIo4A2v&enable-funding=venmo&currency=ILS" data-sdk-integration-source="button-factory"></script>
    <script>
      function initPayPalButton() {
        var shipping = 0;
        var itemOptions = document.querySelector("#smart-button-container #item-options");
    var quantity = parseInt();
    var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
    if (!isNaN(quantity)) {
      quantitySelect.style.visibility = "visible";
    }
    var orderDescription = 'Instagram followers';
    if(orderDescription === '') {
      orderDescription = 'Item';
    }
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'gold',
        layout: 'vertical',
        label: 'pay',
        
      },
      createOrder: function(data, actions) {
        var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
        var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
        var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
        if(quantitySelect.options.length > 0) {
          quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
        } else {
          quantity = 1;
        }

        tax *= quantity;
        tax = Math.round(tax * 100) / 100;
        var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
        priceTotal = Math.round(priceTotal * 100) / 100;
        var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

        return actions.order.create({
          purchase_units: [{
            description: orderDescription,
            amount: {
              currency_code: 'ILS',
              value: priceTotal,
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: itemTotalValue,
                },
                shipping: {
                  currency_code: 'ILS',
                  value: shipping,
                },
                tax_total: {
                  currency_code: 'ILS',
                  value: tax,
                }
              }
            },
            items: [{
              name: selectedItemDescription,
              unit_amount: {
                currency_code: 'ILS',
                value: selectedItemPrice,
              },
              quantity: quantity
            }]
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          
          // Full available details
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

          // Show a success message within this page, e.g.
          const element = document.getElementById('paypal-button-container');
          element.innerHTML = '';
          element.innerHTML = '<h3>Thank you for your payment!</h3>';

          // Or go to another URL:  actions.redirect('thank_you.html');

        });
      },
      onError: function(err) {
        console.log(err);
      },
    }).render('#paypal-button-container');
  }
  initPayPalButton();
    </script> */}