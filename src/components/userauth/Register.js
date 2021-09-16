import React, { useState } from "react";
import { registerInstance } from "../../axios";
import { useHistory } from "react-router-dom";

import Error from "../misc/Error";

export default function Register() {
  const history = useHistory();

  //Register works as expected with a few tweeks.
  // 1st - Django requires a username not a email to login
  // therefore In the post request you can see that I set the username field and email field to the same value.
  // there is no seperate username field for the user to sign up to.
  // There error is not dynamic.

  const initialFormData = Object.freeze({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });

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

    // using username and email as one in the same in the overall model of the product.
    // removing the local storage authorization value to prevent a bug from the axios instance.

    let email = formData.username;
    // localStorage.removeItem("Authorization");
    if (
      formData.username.length > 0 &&
      formData.password.length > 0 &&
      formData.first_name.length > 0 &&
      formData.last_name.length > 0
    ) {
      registerInstance
        .post("api/register/", {
          username: formData.username,
          password: formData.password,
          email: email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        })
        .then(() => {
          history.push("/login");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.username);
        });
    } else {
      setErrorMessage("All fields must be filled out");
    }
  };

  return (
    <div>
      <div className="min-h-screen  container items-center py-12 mx-auto">
        <div className=" flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-gray-50 border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1>Register</h1>
          {errorMessage && (
            <Error
              errorMessage={errorMessage}
              clearError={() => setErrorMessage(undefined)}
            />
          )}
          <form action="post" autoComplete="off">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered input-accent"
                name="first_name"
                id="first_name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered input-accent"
                name="last_name"
                id="last_name"
                onChange={handleChange}
              ></input>
            </div>
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
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
