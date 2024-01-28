import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import "./CheckoutButton.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

// const stripePromise = loadStripe(
//   "pk_test_51Obwa9IkLSJI4HcnpdIibMEYfYhipKQAXfSx1GNa5zTCDDkPEVQFlyN72jp95K9ghydu6S71GdoeyBRsVcggx7gi00b60KQlIt"
// );
const stripePromise = async () =>
  await loadStripe(
    process.env.REACT_APP_STRIPE_DEV_PUBLISHABLE === undefined
      ? ""
      : process.env.REACT_APP_STRIPE_DEV_PUBLISHABLE
  );

const CheckoutButton = () => {
  const handleClick = async (event: any) => {
    console.log(event);
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise();
    if (stripe !== null) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1OcC15IkLSJI4Hcn0Pv7ejuz", // Replace with the ID of your price
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: "http://localhost:3000/order",
        cancelUrl: "http://localhost:3000/order",
      });
    }
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role="link" onClick={handleClick} className="order-checkout-button">
      Checkout
    </button>
  );
};

export default CheckoutButton;
