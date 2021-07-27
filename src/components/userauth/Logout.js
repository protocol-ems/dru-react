import React, { useContext } from "react";
import { axiosInstance } from "../../axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const logOutHandler = () => {
    let token = localStorage.getItem("Authorization");

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
