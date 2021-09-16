import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreateSubscriptionSection from "./CreateSubscriptionSection";

export default function SubscriptionWrapper() {
  const stripePromise = loadStripe(
    "pk_test_51JWjDxJEjyoAE1rtYIa5QzZgcsRyvuJ6lCkSSpHapygbSvFMHKkoEOUaEoXqdme01VDg2t2b3w2rPpN0QTWvTUtN00SPwLlYgz"
  );
  return (
    <Elements stripe={stripePromise}>
      <CreateSubscriptionSection />
    </Elements>
  );
}
