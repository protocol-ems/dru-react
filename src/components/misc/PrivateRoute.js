import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  // This private route redirects to the dashboard when the page is refreshed or if a specific url is attempted.
  // the dashboard does all the verification - and will redirect to the login page if needed.

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     let token = localStorage.getItem("Authorization");

  //     axiosInstance
  //       .get("/users/info/")
  //       .then((res) => {
  //         setUserData({
  //           user: res.data[0],
  //         });
  //         setAuth(true);
  //       })
  //       .catch(() => {
  //         setAuth(false);
  //       });
  //   };
  //   getUserInfo();
  // }, [setUserData]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
