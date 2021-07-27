import React from "react";
import { axiosInstance } from "../../axios";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();

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
        console.log(res);
        console.log(res.data);
      });
  };

  return <div onClick={logOutHandler}>Logout</div>;
}
