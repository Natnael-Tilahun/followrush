import React, { useReducer } from "react";

export const defaultContext = {
  orderDetails: null,
  step: "DETAILS",
  setOrderDetails: () => {},
  setStep: () => {},
};

export const Context = React.createContext(defaultContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "setOrderDetails":
      return {
        ...state,
        orderDetails: action.payload,
      };
    case "setStep":
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);

  return (
    <Context.Provider
      value={{
        ...state,
        setOrderDetails: (data) => {
          dispatch({ type: "setOrderDetails", payload: data });
          return data;
        },
        setStep: (data) => {
          dispatch({ type: "setStep", payload: data });
          return data;
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};
