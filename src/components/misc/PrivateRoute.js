import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);

  // Pinging the server on each page route to make sure the person is authenticated.
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     let token = localStorage.getItem("Authorization");

  //     if (token === null || undefined) {
  //       localStorage.setItem("Authorization", "");
  //       token = "";
  //     }
  //     if (token !== "null") {
  //       axiosInstance.get("/users/info/").then((res) => {
  //         setUserData({
  //           user: res.data[0],
  //         });
  //       });
  //     }
  //   };

  //   getUserInfo();
  // }, [setUserData]);

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
