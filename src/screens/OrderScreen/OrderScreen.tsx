import React from "react";
import "./OrderScreen.css";
import Checkout from "../Checkout/Checkout";

type OrderScreenProps = {};
const OrderScreen = (props: OrderScreenProps) => {

  return (
    <>
      <div>OrderScreen</div>  
      <Checkout/>
    </>
  );
};

export default OrderScreen;
