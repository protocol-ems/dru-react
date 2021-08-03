import React, { useState, useContext } from "react";
import { axiosInstance } from "../../axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

import Error from "../misc/Error";

export default function Register() {
  const history = useHistory();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const { setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("api/login/", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("Authorization", res.data.token);
        axiosInstance.defaults.headers["Authorization"] =
          "Token " + localStorage.getItem("Authorization");
      })
      .catch((error) => {
        error
          ? setErrorMessage("The credentials provided are incorrect")
          : setErrorMessage(undefined);
      })
      .then(() => {
        let token = localStorage.getItem("Authorization");

        axiosInstance
          .get("/users/info/", {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setUserData({
              user: res.data[0],
            });
          })

          .then(() => {
            history.push("/dashboard");
          });
      });
  };

  return (
    <div>
      <div className="min-h-screen  container items-center py-12 mx-auto">
        <div className=" flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1>Login</h1>
          {errorMessage && (
            <Error
              errorMessage={errorMessage}
              clearError={() => setErrorMessage(undefined)}
            />
          )}
          <form action="post" autoComplete="off">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="username"
                id="username"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                id="password"
                onChange={handleChange}
              ></input>
            </div>

            <button
              type="submit"
              className="w-full px-16 py-2 my-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-green-300 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-400"
              onClick={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
