import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import UserContext from "./components/context/UserContext";
import PrivateRoute from "./components/misc/PrivateRoute";
import { axiosInstance } from "./axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreateSubscriptionSection from "./components/dashboard/components/payments/CreateSubscriptionSection";

import Navbar from "./components/navbar/Navbar";
import Register from "./components/userauth/Register";
import Login from "./components/userauth/Login";
import Dashboard from "./components/dashboard/pages/Dashboard";
import CreateCompany from "./components/dashboard/components/CreateCompany";
import JoinCompany from "./components/dashboard/components/JoinCompany";
import Error from "./components//misc/Error";
import CreateDocumentHeader from "./components/dashboard/components/documents/CreateDocumentHeader";
import CreateMedicine from "./components/dashboard/components/documents/pages/CreateMedicine";
import CreateProcedure from "./components/dashboard/components/documents/pages/CreateProcedure";
import CreateProtocol from "./components/dashboard/components/documents/pages/CreateProtocol";
import HomePage from "./components/dashboard/pages/HomePage";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51JWjDxJEjyoAE1rtYIa5QzZgcsRyvuJ6lCkSSpHapygbSvFMHKkoEOUaEoXqdme01VDg2t2b3w2rPpN0QTWvTUtN00SPwLlYgz"
  );

  const [userData, setUserData] = useState({
    user: null,
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  // I do not think I need to be setting the user at the very top of the app. In the dashboard seems to be fine. Leaving code for now to make sure nothing breaks 8/30/21

  useEffect(() => {
    const getUserInfo = async () => {
      let token = localStorage.getItem("Authorization");

      if (token === null || undefined) {
        localStorage.setItem("Authorization", "");
        token = "";
      }
      if (token !== "null") {
        axiosInstance.get("/users/info/").then((res) => {
          setUserData({
            user: res.data[0],
          });
        });
      }
    };

    getUserInfo();
  }, [setUserData]);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />

        {errorMessage && (
          <Error
            errorMessage={errorMessage}
            clearError={() => setErrorMessage(undefined)}
          />
        )}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-company"
            component={CreateCompany}
          />
          <PrivateRoute exact path="/join-company" component={JoinCompany} />
          <PrivateRoute
            exact
            path="/create-document-header"
            component={CreateDocumentHeader}
          />
          <PrivateRoute
            exact
            path="/create-medicine"
            component={CreateMedicine}
          />

          <PrivateRoute
            exact
            path="/create-procedure"
            component={CreateProcedure}
          />
          <PrivateRoute
            exact
            path="/create-protocol"
            component={CreateProtocol}
          />
          <Elements stripe={stripePromise}>
            <PrivateRoute
              exact
              to="/create-subscription"
              component={CreateSubscriptionSection}
            />
          </Elements>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
