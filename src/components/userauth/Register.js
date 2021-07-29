import React, { useState } from "react";
import { axiosInstance } from "../../axios";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [formData, setFormData] = useState(initialFormData);

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
    localStorage.removeItem("Authorization");
    axiosInstance
      .post("api/register/", {
        username: formData.username,
        password: formData.password,
        email: email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
      .then(() => {
        history.push("/login");
      });
  };

  return (
    <div>
      <div className="min-h-screen  container items-center py-12 mx-auto">
        <div className=" flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1>Register</h1>
          <form action="post" autoComplete="off">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
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
                className="input input-bordered"
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
