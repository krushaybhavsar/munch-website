import React, { useState } from "react";
import "./OrderScreen.css";
import Checkout from "../Checkout/Checkout";
import { RestaurantMenuItem } from "../../types";

type OrderScreenProps = {};
const OrderScreen = (props: OrderScreenProps) => {

  const [orderItem, setOrderItem] = 
    useState<RestaurantMenuItem>({
      restaurantId: "",
      stripeId: "price_1OcC15IkLSJI4Hcn0Pv7ejuz",
      name: "",
      basePrice: 0
    });

  return (
    <>
      <div>OrderScreen</div>  
      <Checkout order={orderItem}/>
    </>
  );
};

export default OrderScreen;
