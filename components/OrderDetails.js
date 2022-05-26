import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { plans } from "../data/plans";
import { Context } from "../context/context";
import en from "../data/en.json";

function OrderDetails() {
  const context = useContext(Context);
  const { detailsPage } = en;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    // getting details ready
    const { plan, username, email } = values;
    const parsedPlan = JSON.parse(plan);
    const orderDetails = {
      planSelected: parsedPlan,
      email,
      username, //instagram username
      totalPrice: parsedPlan.price * (parsedPlan.quantity / 1000),
      currency: parsedPlan.currency,
    };

    context.setOrderDetails(orderDetails);
    context.setStep("CHECKOUT");
  };

  return (
    <div className="bg-white w-96 h-[65%] rounded-md drop-shadow-md">
      <div className="m-10 flex flex-col items-center">
        <img src="mainlogo.svg" />
        <div className="border-b border-blue-600 w-full mt-10 mb-5" />
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="w-full flex flex-col justify-center items-center space-y-5"
        >
          <div className="w-full  flex flex-col justify-center items-center ">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {detailsPage.plan_label}
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <select
                {...register("plan")}
                id="countries"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {plans.map((plan) => (
                  <option key={plan.label} value={JSON.stringify(plan)}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full  flex flex-col justify-center items-center">
            <label
              htmlFor="email-address-icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {detailsPage.username_label}
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                {...register("username")}
                type="text"
                required
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={detailsPage.username_placeholder}
              />
            </div>
          </div>
          <div className="w-full  flex flex-col justify-center items-center">
            <label
              htmlFor="email-address-icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {detailsPage.email_label}
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                {...register("email")}
                type="text"
                id="email-address-icon"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={detailsPage.email_placeholder}
              />
            </div>
          </div>
          <div className="w-[100%] flex justify-center">
            <button
              className="bg-[#ffce1e] p-4 w-full mt-6 rounded-md "
              type="submit"
            >
              {detailsPage.button_label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
