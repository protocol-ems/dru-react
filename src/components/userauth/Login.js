import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "src/components/context/UserContext";
import { axiosInstance } from "src/axiosInstance";
import Error from "src/components/misc/Error";

export default function Login({ setIsAuth }) {
  const history = useHistory();

  // The login component sends a post request and then saves the knox token to local storage for authenticaiton .
  // The error handling is not 'dynamic' and will just say bad info.
  // After a good login, it will set the userData and redirect to the dashboard.

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
            setIsAuth(true);
          })

          .then(() => {
            history.push("/dashboard");
          });
      });
  };

  return (
    <div>
      <div className="min-h-screen  container items-center py-12 mx-auto">
        <div className=" flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-gray-50 border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
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
                className="input input-bordered input-accent"
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
                className="input input-bordered input-accent"
                name="password"
                id="password"
                onChange={handleChange}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-accent w-full mt-4"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
