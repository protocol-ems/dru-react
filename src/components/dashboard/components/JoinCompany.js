import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "../../../axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function JoinCompany() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const initialFormData = Object.freeze({
    requestedCompany: undefined,
  });

  const [companyList, setCompanyList] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    let mounted = true;
    const getCompanyList = async () => {
      if (userData.user) {
        await axiosInstance.get("/company/").then((res) => {
          if (mounted) {
            setCompanyList(res.data);
          }
        });
      }
    };
    getCompanyList();
    return () => (mounted = false);
  }, [userData.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/users/${userData.user.id}/`, {
        requestedCompany: formData.requestedCompany,
      })
      .then((res) => {
        setUserData({
          user: res.data,
        });
      })
      .then(() => {
        history.push("/dashboard");
      });
  };

  const handleChange = (e) => {
    setFormData({
      requestedCompany: e.target.value,
    });
  };

  return (
    <div className="container mx-auto pt-24 ">
      <h2 className="text-2xl pb-24 ">Request access to a company.</h2>
      <form
        action="Post"
        className="flex flex-col items-center md:w-1/2 border px-4 py-10 rounded-xl drop-shadow-lg bg-gray-50"
      >
        <select
          defaultValue={"DEFAULT"}
          className="select select-bordered select-accent w-full"
          onChange={handleChange}
        >
          <option value="DEFAULT" disabled="disabled">
            Select your company
          </option>
          {companyList
            ? companyList.map((company) => {
                return (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                );
              })
            : ""}
        </select>
        <button
          type="submit"
          className="md:w-1/2 px-4 py-2 my-4 text-base text-white transition duration-500 ease-in-out transform bg-green-300 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-400"
          onClick={handleSubmit}
        >
          Request Access
        </button>
      </form>
    </div>
  );
}
