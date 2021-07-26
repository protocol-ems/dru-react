import React, { useState } from "react";
import { axiosInstance } from "../../axios";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
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
    console.log(formData);
    axiosInstance
      .post("api/login/", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("Authorization", res.data.token);
        axiosInstance.defaults.headers["Authorization"] =
          "Token " + localStorage.getItem("Authorization");
        history.push("/");
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div>
      <div className="min-h-screen  container items-center py-12 mx-auto">
        <div className=" flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <h1>Login</h1>
          <form type="POST" autoComplete="off">
            <label className="text-base text-gray-500" htmlFor="register-email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gradient-to-r from-blue-100  to-green-100 border focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-inset-2"
              type="email"
              name="username"
              id="username"
              onChange={handleChange}
            />
            <label
              className="text-base  text-gray-500"
              htmlFor="register-password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gradient-to-r from-green-100  to-blue-100 border focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-inset-2"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full px-16 py-2 my-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-green-300 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-400"
              onClick={handleSubmit}
            >
              {" "}
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
