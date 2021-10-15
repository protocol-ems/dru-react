import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import UserContext from "src/components/context/UserContext";
import PrivateRoute from "src/components/misc/PrivateRoute";
import { axiosInstance } from "src/axiosInstance";
import Navbar from "src/components/navbar/Navbar";
import Register from "src/components/userauth/Register";
import Login from "src/components/userauth/Login";
import Dashboard from "src/components/dashboard/pages/Dashboard";
import OfflineDashboard from "src/components/dashboard/components/OfflineDashboard";
import CreateCompany from "src/components/dashboard/components/CreateCompany";
import JoinCompany from "src/components/dashboard/components/JoinCompany";
import Error from "src/components/misc/Error";
import CreateDocumentHeader from "src/components/dashboard/components/documents/CreateDocumentHeader";
import CreateMedicine from "src/components/dashboard/components/documents/pages/CreateMedicine";
import CreateProcedure from "src/components/dashboard/components/documents/pages/CreateProcedure";
import CreateProtocol from "src/components/dashboard/components/documents/pages/CreateProtocol";
import HomePage from "src/components/dashboard/pages/HomePage";
import CreateNewPage from "src/components/dashboard/pages/CreateNewPage";
import EmployeeListPage from "src/components/dashboard/pages/EmployeeListPage";
import WaitListPage from "src/components/dashboard/pages/WaitListPage";
import ImageCenterPage from "src/components/dashboard/pages/ImageCenterPage";
import BillingCenterPage from "src/components/dashboard/pages/BillingCenterPage";
import AdminNavBar from "src/components/dashboard/components/AdminNavBar";
import AboutUs from "src/components/dashboard/pages/AboutUs";
import ContactUs from "src/components/dashboard/pages/ContactUs";

import CreateSubscriptionSection from "src/components/dashboard/components/payments/CreateSubscriptionSection";

import Footer from "src/components/footer/Footer";

function App() {
  //this is what we use to set our one useContext
  // this userData can be accessed any where with useContext
  // userData is set after logging in.

  const [userData, setUserData] = useState({
    user: null,
  });

  const [isAuth, setIsAuth] = useState(true);

  // I put setStripePromise on the login component to avoid the error saying setStripePromise is defined but not used.
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(
      "pk_test_51JWjDxJEjyoAE1rtYIa5QzZgcsRyvuJ6lCkSSpHapygbSvFMHKkoEOUaEoXqdme01VDg2t2b3w2rPpN0QTWvTUtN00SPwLlYgz"
    )
  );

  // generic error msg component. Not the greatest but it works.
  const [errorMessage, setErrorMessage] = useState(undefined);

  // This useEffect checks local storage and attempts to log the user in if they have a good token.
  // a 401 error happens when the token is expired

  useEffect(() => {
    const getUserInfo = async () => {
      let token = localStorage.getItem("Authorization");

      if (token === null || token === undefined || token === "") {
        localStorage.setItem("Authorization", "");
        token = "";
        setIsAuth(false);
      }
      if (token !== "null" || token !== "") {
        axiosInstance
          .get("/users/info/")
          .then((res) => {
            setUserData({
              user: res.data[0],
            });

            if (res.data.length === 0) {
              setIsAuth(false);
            } else {
              setIsAuth(true);
            }
          })
          .catch(() => {
            localStorage.setItem("Authorization", "");
            setIsAuth(false);
          });
      }
    };

    getUserInfo();
  }, [setUserData, isAuth]);

  // The top of the app is wrapped in the user context.
  // the top of the app has the nav bar than a switch statement for differnt routes.
  // the private route is a custom route that redicts to the dashboard. And the dashboard will redirect to login. I did this because otherwise it was redirecting to the login on page refresh.
  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar setIsAuth={setIsAuth} />

        {errorMessage && (
          <Error
            errorMessage={errorMessage}
            clearError={() => setErrorMessage(undefined)}
          />
        )}
        {userData.user && userData.user.employee_type === 4 && <AdminNavBar />}
        <Elements stripe={stripePromise}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact-us" component={ContactUs} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/login">
              <Login
                setIsAuth={setIsAuth}
                setStripePromise={setStripePromise}
              />
            </Route>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/offline-dashboard"
              component={OfflineDashboard}
            />
            <PrivateRoute
              exact
              path="/create-company"
              component={CreateCompany}
              isAuth={isAuth}
            />
            <PrivateRoute exact path="/join-company" component={JoinCompany} />
            <PrivateRoute
              exact
              path="/create-document-header"
              component={CreateDocumentHeader}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/create-medicine"
              component={CreateMedicine}
              isAuth={isAuth}
            />

            <PrivateRoute
              exact
              path="/create-procedure"
              component={CreateProcedure}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/create-protocol"
              component={CreateProtocol}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/create-new"
              component={CreateNewPage}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/employee-list"
              component={EmployeeListPage}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/wait-list"
              component={WaitListPage}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/image-center"
              component={ImageCenterPage}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              path="/billing-center"
              component={BillingCenterPage}
              isAuth={isAuth}
            />
            <PrivateRoute
              exact
              to="/create-subscription"
              component={CreateSubscriptionSection}
              isAuth={isAuth}
            />
          </Switch>
        </Elements>
        {!userData.user && <Footer />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
