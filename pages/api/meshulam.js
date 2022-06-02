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