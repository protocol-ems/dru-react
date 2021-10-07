import React, { useState, useEffect } from "react";
import ApiService from "src/axiosInstance";
import { useHistory } from "react-router-dom/";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import stripeLogo from "src/images/stripe.svg";

export default function ChangeCardInfo({ companyInfo, subscriptionInfo }) {
  const [cardInfo, setCardInfo] = useState();
  const [paymentId, setPaymentId] = useState();
  const [changeInfo, setChangeInfo] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const getCustomerInfo = async () => {
    await ApiService.getCustomerInfo({
      customer_id: companyInfo.stripe_cus_id,
    }).then((res) => {
      setPaymentId(
        res.data.customer_info.invoice_settings.default_payment_method
      );
    });
  };

  useEffect(() => {
    let isUnmount = false;

    const getPaymentInformation = async () => {
      await ApiService.getCardInformation({
        payment_method: paymentId,
      }).then((res) => {
        if (!isUnmount) {
          setCardInfo(res.data.payment_information);

          setChangeInfo(true);
        }
      });
    };
    if (paymentId && paymentId.length > 0) getPaymentInformation();
    return () => {
      isUnmount = true;
    };
  }, [paymentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (
      email.length < 1 ||
      name.length < 1 ||
      phone.length < 1 ||
      line1.length < 1 ||
      city.length < 1 ||
      city.length < 1 ||
      state.length < 1 ||
      postalCode.length < 1
    ) {
      setError("All fields must be filled out.");
    } else {
      setError(null);
    }

    if (paymentMethod) {
      ApiService.changeBillingDetails({
        payment_method_id: paymentMethod.id,
        customer: companyInfo.stripe_cus_id,
        email,
        billing_details: {
          address: {
            city: city,
            line1: line1,
            line2: line2,
            postal_code: postalCode,
            state: state,
          },
          name: name,
          phone: phone,
        },
      })
        .then((res) => {
          console.log(res);
          history.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div className="pb-12">
      <div className="text-left px-12 py-4 text-2xl text-gray-200">
        Current Card Information:
      </div>
      {cardInfo && (
        <div className="text-left px-12 text-2xl text-gray-200">
          Last four:
          <span className="text-accent font-bold"> {cardInfo.card.last4}</span>
        </div>
      )}

      <div className="flex justify-end p-12">
        {!changeInfo && (
          <button
            className="btn glass"
            onClick={() => {
              getCustomerInfo();
            }}
          >
            See Card Information
          </button>
        )}
      </div>
      {changeInfo && (
        <form>
          {update && (
            <div>
              <div className="p-4">
                <label className="label" htmlFor="name">
                  Billing Name
                </label>
                <input
                  className="input input-accent w-full text-black"
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
                  className="input input-accent  w-full text-black"
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
                  className="input input-accent  w-full text-black"
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
                  className="input input-accent  w-full text-black"
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
                  className="input input-accent  w-full block my-2 text-black"
                  id="address2"
                  name="address2"
                  type="address2"
                  placeholder="Address Line 2 - Building #, Suite #, etc..."
                  value={line2}
                  onChange={(event) => {
                    setLine2(event.target.value);
                  }}
                />
                <label className="label" htmlFor="city">
                  City
                </label>
                <input
                  className="input input-accent  w-full text-black"
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
                  className="input input-accent w-full text-black"
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
                  className="input input-accent  w-full text-black"
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
              </div>
              <CardElement
                id="card-element"
                onChange={handleChange}
                className=" p-4 border border-accent rounded m-4 bg-gray-50"
              />
              <div className="card-errors text-red-600 p-2" role="alert">
                {error}
              </div>
            </div>
          )}

          {!update && (
            <button className="btn glass" onClick={() => setUpdate(true)}>
              {" "}
              Change Billing Info
            </button>
          )}
          {update && (
            <div className="flex flex-col lg:flex-wrap justify-around">
              <button
                className="btn btn-accent m-4"
                onClick={(e) => handleSubmit(e)}
              >
                {" "}
                Update billing info
              </button>
              <button
                className="btn btn-error m-4"
                onClick={() => setUpdate(false)}
              >
                {" "}
                Cancel Changes
              </button>
            </div>
          )}
        </form>
      )}
      <div className="flex flex-col justify-center">
        <div className="text-gray-300 text-sm text-left p-4">
          All card information is powered by stripe. OurProtocol does not save
          any card information.
        </div>
        <a href="https://www.stripe.com" rel="noreferrer" target="_blank">
          <img
            className="mx-auto"
            src={stripeLogo}
            alt="stripe-logo"
            width="125"
          />
        </a>
      </div>
    </div>
  );
}
