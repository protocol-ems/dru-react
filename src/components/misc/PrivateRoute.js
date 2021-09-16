import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);
  // This private route redirects to the dashboard when the page is refreshed or if a specific url is attempted.
  // the dashboard does all the verification - and will redirect to the login page if needed.

  return (
    <Route
      {...rest}
      render={(props) =>
        userData.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
