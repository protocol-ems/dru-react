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
    const getPaymentInformation = async () => {
      await ApiService.getCardInformation({
        payment_method: paymentId,
      }).then((res) => {
        setCardInfo(res.data.payment_information);

        setChangeInfo(true);
      });
    };
    if (paymentId && paymentId.length > 0) getPaymentInformation();
  }, [paymentId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    console.log(paymentMethod);
    ApiService.changeBillingDetails({
      payment_method_id: paymentMethod.id,
      customer: companyInfo.stripe_cus_id,
    })
      .then((res) => {
        console.log(res);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div>
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
            <CardElement
              id="card-element"
              onChange={handleChange}
              className=" p-4 border border-accent rounded m-4 bg-gray-50"
            />
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
