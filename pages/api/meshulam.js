<<<<<<< HEAD
import { data } from "autoprefixer";

// const pageCode = process.env.PAGE_CODE
// const userId = process.env.USER_ID
// const apiKey = process.env.API_KEY

const handler = async (req, res)=>{
 
    const {
        pageCode="pageCode",
        userId= "userId",
        apiKey= "apiKey",
        sum=10,
        description="",
        successUrl = "https://followrush.vercel.app/order",
        cancelUrl = "https://followrush.vercel.app",
    }=req.body;

const response = fetch('https://d3885f47-82f7-4ab7-a999-09b37edff1a1.mock.pstmn.io/createPaymentProcess', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    res.status(200).json({"status :": data.status, ...data})
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(500).json({"error": error.message})
  });
    // }
    // catch(e){
    //     res.status(500).json({...data,error:e.message})
    // }
};
export default  handler;
=======
const pageCode = process.env.pageCode;
const userId = process.env.userId;
const apiKey = process.env.apiKey;

const handler = async (req, res) => {
    const {
      sum,
      processId,
      processToken,
      pageField,
      userId,
      pageCode,
      successUrl,
      cancelUrl,
      _runs,
      _interval,
    } = req.body;

    // if paymant already paid approve the payment
    if (processId && processToken){
      try {
        // If a payment_intent_id is passed, retrieve the paymentIntent
        fetch("https://smmfollows.com/api/v2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pageCode: pageCode,
            transactionId: processId,
            transactionToken: processToken,
          }),
        })
          .then((res)=>{res.json()})
          .then((data)=>{

            // if the payment is paid approve the payment
            if(data.status=="paid"){
              const approveTransction=fetch("https://smmfollows.com/api/v2", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  pageCode: pageCode,
                  transactionId: processId,
                  transactionToken: processToken,
                  paymentSum:amount,
                  ...data
                }),
              })
              res.status(200).json(approveTransction);
              return;
            }
          })

      } catch (e) {
        //Catch any error and return a status 500
        if (e.code !== "resource_missing") {
          const errorMessage =
            e instanceof Error ? e.message : "Internal server error";
          res.status(500).json({ statusCode: 500, message: errorMessage });
          return;
        }
      }
    }

    // create new payment process
    try {
        const response =await fetch("https://private-anon-5070bf9ef3-meshulam1.apiary-proxy.com/api/light/server/1.0/createPaymentProcess/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pageCode:"pageCode",
              userId: "userId",
              sum:sum,
              successUrl:"successUrl",
              cancelUrl:"cancelUrl",
              // pageField:pageField,
            }),
          })
          const payment_fetch=await response.json();
          alert(payment_fetch)
          return payment_fetch;
              // const processId =data.processId;
              // const processToken = data.processToken;
              // const url = data.url;
          
    } catch (e) {
           //Catch any error and return a status 500
            if (e.code !== "resource_missing") {
              const errorMessage =
                e instanceof Error ? e.message : "Internal server error";
              res.status(500).json({ statusCode: 500, message: errorMessage });
              return;
            }
    }
}
    export default handler;
>>>>>>> ed165ac8d1b6472f367b11f2e90cb4853e99bce8
