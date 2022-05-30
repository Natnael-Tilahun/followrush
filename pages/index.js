import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Context } from "../context/context";
import OrderDetails from "../components/OrderDetails";
import Checkout from "../components/Checkout";

export default function Home() {
  const context = useContext(Context);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // const onSubmit = (values) => {
  //   // getting details ready
  //   const { plan, username, email } = values;
  //   const parsedPlan = JSON.parse(plan);
  //   const orderDetails = {
  //     planSelected: parsedPlan,
  //     email,
  //     username, //instagram username
  //     totalPrice: parsedPlan.price * (parsedPlan.quantity / 1000),
  //     currency: "USD", // hard coded as all of the api prices are in usd
  //   };

  //   context.setOrderDetails(orderDetails);
  // };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      {context.step === "DETAILS" && <OrderDetails />}
      {context.step === "CHECKOUT" && context.orderDetails && <Checkout />}
    </div>
  );
}
