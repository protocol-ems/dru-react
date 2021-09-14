import React, { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ApiService from "../../../../axios";
import stripeLogo from "../../../../images/stripe.svg";
import UserContext from "../../../context/UserContext";
import { axiosInstance } from "../../../../axios";

export default function CreateSubscriptionSection() {
  const { userData } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [subscriptionTiers, setSubscriptionTiers] = useState();
  const [subscriptionType, setSubscriptionType] = useState();
  const stripe = useStripe();
  const elements = useElements();
  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };
  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    ApiService.saveStripeInfo({
      email,
      payment_method_id: paymentMethod.id,
      subscription_type_id: subscriptionType,
      billing_details: {
        address: {
          city: city,
          line1: line1,
          line2: line2,
          postal_code: postalCode,
          state: state,
        },
        email: email,
        name: name,
        phone: phone,
      },
      company: userData.user.company,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getSubscriptionTiers = async () => {
      await axiosInstance.get("/payments/subscriptions/").then((res) => {
        setSubscriptionTiers(res.data);
      });
    };
    getSubscriptionTiers();
  }, []);

  const tierList = [
    { value: "small", description: "Small Tier - 25 user max - $50 per month" },
    {
      value: "medium",
      description: "Medium Tier - 100 user max - $100 per month",
    },
    {
      value: "large",
      description: "Large Tier - 200 user max - $200 per month",
    },
    {
      value: "xl-large",
      description: "Extra Large Tier - 400 user max - $300 per month",
    },
  ];

  return (
    <div>
      <div>
        Please choose your subscription type and fill out the details below
      </div>

      <div className="container mx-auto mt-24 w-1/2 border px-2 py-4 md:px-10 md:py-12 rounded-xl drop-shadow-lg bg-gray-50">
        <form onSubmit={handleSubmit} className="stripe-form flex flex-col ">
          <label className="label" htmlFor="name">
            OurProtcol Tier
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="select select-bordered select-accent w-full"
            onChange={(event) => {
              setSubscriptionType(event.target.value);
            }}
          >
            <option value="DEFAULT" disabled="disabled">
              Select your tier
            </option>
            {subscriptionTiers &&
              subscriptionTiers.map((tier) => {
                return (
                  <option value={tier.id} key={tier.id}>
                    {`${tier.user_max} max users at $${tier.price} per month`}
                  </option>
                );
              })}
          </select>
          <label className="label" htmlFor="name">
            Billing Name
          </label>
          <input
            className="input input-accent w-full"
            id="billing-name"
            name="billing-name"
            type="name"
            placeholder="Billing Name"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label className="label" htmlFor="email">
            Email Address
          </label>
          <input
            className="input input-accent  w-full"
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <label className="label" htmlFor="phone">
            Billing Phone Number
          </label>
          <input
            className="input input-accent  w-full"
            id="phone"
            name="phone"
            type="phone"
            placeholder="555-555-5555"
            required
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />

          <label className="label" htmlFor="address-line-1">
            Address Line
          </label>
          <input
            className="input input-accent  w-full"
            id="address"
            name="address"
            type="address"
            placeholder="Address Line 1"
            required
            value={line1}
            onChange={(event) => {
              setLine1(event.target.value);
            }}
          />
          <input
            className="input input-accent  w-full block my-2"
            required="no"
            id="address2"
            name="address2"
            type="address2"
            placeholder="Address Line 2 - Building #, Suite #, etc..."
            required
            value={line2}
            onChange={(event) => {
              setLine2(event.target.value);
            }}
          />
          <label className="label" htmlFor="city">
            City
          </label>
          <input
            className="input input-accent  w-full"
            id="city"
            name="city"
            type="city"
            placeholder="City"
            required
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <label className="label" htmlFor="city">
            State
          </label>
          <input
            className="input input-accent  w-full"
            id="state"
            name="state"
            type="state"
            placeholder="State"
            required
            value={state}
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
          <label className="label" htmlFor="city">
            Zip Code
          </label>
          <input
            className="input input-accent  w-full"
            id="zip-code"
            name="zip-code"
            type="zip-code"
            placeholder="Zip Code"
            required
            value={postalCode}
            onChange={(event) => {
              setPostalCode(event.target.value);
            }}
          />

          <div className="mt-4">
            <label htmlFor="card-element label">Credit or debit card</label>
            <CardElement
              id="card-element"
              onChange={handleChange}
              className=" p-4 border m-4"
            />
            <div className="card-errors text-red-600 p-2" role="alert">
              {error}
            </div>
          </div>
          <div className="flex flex-col py-6  items-end">
            <div className="text-sm text-gray-500 py-4">
              Card payments are processed by Stripe. Stripe performs card
              processing for millions of businesses. No card information is
              stored on OurProtocol servers. Click the stripe logo below to
              learn more about Stripe.
            </div>
            <a href="https://www.stripe.com" rel="noreferrer" target="_blank">
              <img src={stripeLogo} alt="stripe" width="175" />
            </a>
          </div>

          <button type="submit" className="submit-btn btn btn-accent">
            Submit Payment
          </button>
          <button
            className="btn"
            onClick={() => {
              console.log(subscriptionType);
            }}
          >
            {" "}
            log data
          </button>
        </form>
      </div>
    </div>
  );
}
