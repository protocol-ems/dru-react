import React, { useState, useEffect } from "react";

import ApiService, { axiosInstance } from "src/axiosInstance";
import Error from "src/components/misc/Error";

export default function ChangeSubscription({ companyInfo, subscriptionInfo }) {
  const [changeSubscription, setChangeSubscription] = useState(false);

  const [subscriptionTiers, setSubscriptionTiers] = useState();

  const [newSubscription, setNewSubscription] = useState();

  const [cancel, setCancel] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [currentUserCount, setCurrentUserCount] = useState();

  useEffect(() => {
    const getSubscriptionTiers = async () => {
      await axiosInstance.get("/payments/subscriptions/").then((res) => {
        setSubscriptionTiers(res.data);
      });
    };
    getSubscriptionTiers();
  }, [changeSubscription]);

  const handleSubscriptionChange = (e) => {
    e.preventDefault();
    setNewSubscription(e.target.value);
  };

  const handleSubscriptionSubmit = (e) => {
    e.preventDefault();

    let filteredSubscription = subscriptionTiers.filter(
      (tier) => tier.id === parseInt(newSubscription)
    );

    // axios request to change subscription
    // checks to make sure current subscription does not match the new one
    if (parseInt(newSubscription) === subscriptionInfo.id) {
      setErrorMessage("You are already subscribed at this price.");
    }

    if (currentUserCount > filteredSubscription[0].user_max) {
      setErrorMessage(
        "You have more users than what this plan offers. Please choose a different plan."
      );
    }

    if (
      parseInt(newSubscription) !== subscriptionInfo.id &&
      currentUserCount <= filteredSubscription[0].user_max
    ) {
      ApiService.changeSubscription({
        subscription_type_id: newSubscription,
        stripe_cus_id: companyInfo.stripe_cus_id,
        stripe_sub_id: companyInfo.stripe_sub_id,
        company: companyInfo.id,
      });
    }
  };

  const handleCancelSubscription = (e) => {
    e.preventDefault();
    ApiService.cancelSubscription({
      stripe_sub_id: companyInfo.stripe_sub_id,
      company: companyInfo.id,
    });
  };

  const handleChange = (change) => {
    setCancel(false);
    setChangeSubscription(change);

    setCurrentUserCount(companyInfo.users.length);
  };
  return (
    <div className="w-full">
      {!changeSubscription && (
        <button className="btn glass" onClick={() => handleChange(true)}>
          Change Subscription?
        </button>
      )}
      {changeSubscription && (
        <form>
          {errorMessage && (
            <div className="bg-gray-50 rounded-xl">
              <Error
                errorMessage={errorMessage}
                clearError={() => setErrorMessage(null)}
              />
            </div>
          )}
          <label className="label" htmlFor="name">
            Price & User Count
          </label>
          <select
            defaultValue={"DEFAULT"}
            className="select select-bordered select-accent w-full text-black"
            onChange={(e) => handleSubscriptionChange(e)}
          >
            <option value="DEFAULT" disabled="disabled">
              Price & User Count
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
          <div className="flex flex-col justify-between mt-4">
            <button
              className="btn glass m-2"
              onClick={(e) => {
                handleSubscriptionSubmit(e);
              }}
            >
              Confirm Change Subscription
            </button>
            <button
              className="btn glass m-2"
              onClick={() => handleChange(false)}
            >
              Close
            </button>
            {!cancel && (
              <button
                className="btn btn-outline btn-error m-2"
                onClick={() => setCancel(true)}
              >
                Cancel Subscription
              </button>
            )}
            {cancel && (
              <div className="w-full">
                <button
                  className="btn w-full m-2 btn-accent"
                  onClick={() => setCancel(false)}
                >
                  Do not cancel
                </button>
                <button
                  className="btn w-full m-2 btn-error"
                  onClick={(e) => {
                    handleCancelSubscription(e);
                  }}
                >
                  Cancel Subscription
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
