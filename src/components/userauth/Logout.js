import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";


export default function Logout() {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const logOutHandler = () => {
    let token = localStorage.getItem("Authorization");

    // the logout component removes userData, redirects to the homepage, and removes the local storage token.
    axiosInstance
      .post("api/logout/", {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("Authorization", null);
        history.push("/");
        setUserData({
          user: null,
        });
      });
  };

  return (
    <div className="cursor-pointer" onClick={logOutHandler}>
      Logout
    </div>
  );
}
