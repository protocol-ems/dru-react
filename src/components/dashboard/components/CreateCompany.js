import React, { useState, useContext } from "react";
import { axiosInstance } from "../../../axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function CreateCompany() {
  const history = useHistory();

  const initialFormData = Object.freeze({
    name: "",
    phone: "",
    street_address: "",
    zipcode: "",
    state: "",
    city: "",
  });

  const { userData } = useContext(UserContext);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/company/", {
        name: formData.name,
        phone: formData.phone,
        street_address: formData.street_address,
        zipcode: formData.zipcode,
        state: formData.state,
        city: formData.city,
        documents: [],
        users: [userData.user.id],
        requested_users: [],
        document_headers: [],
      })
      .then(() => {
        history.push("/dashboard");
      });
  };

  return (
    <div className="container mx-auto mt-24 w-1/2 border px-10 py-12 rounded-xl drop-shadow-lg bg-gray-50">
      {userData.user !== null ? (
        <form action="post" autoComplete="off">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              placeholder="Company Name"
              className="input input-bordered"
              name="name"
              id="name"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Best Contact Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered"
              name="phone"
              id="phone"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Street Address</span>
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className="input input-bordered"
              name="street_address"
              id="street_address"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Zipcode</span>
            </label>
            <input
              type="text"
              placeholder="Zipcode"
              className="input input-bordered"
              name="zipcode"
              id="zipcode"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              placeholder="State"
              className="input input-bordered"
              name="state"
              id="state"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered"
              name="city"
              id="city"
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
      ) : (
        "Please login to create a company"
      )}
    </div>
  );
}
