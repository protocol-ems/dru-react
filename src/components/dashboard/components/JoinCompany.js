import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import Error from "src/components/misc/Error";

export default function JoinCompany() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const initialFormData = Object.freeze({
    requested_company: null,
  });

  const [companyList, setCompanyList] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let mounted = true;
    const getCompanyList = async () => {
      if (userData.user) {
        await axiosInstance.get("/active-companies/").then((res) => {
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
    if (formData.requested_company === null) {
      setErrorMessage("Please select an agency to join.");
    }
    if (formData.requested_company !== null) {
      axiosInstance
        .patch(`/users/${userData.user.id}/`, {
          requested_company: formData.requested_company,
        })
        .then((res) => {
          setUserData({
            user: res.data,
          });
        })
        .then(() => {
          history.push("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      requested_company: e.target.value,
    });
  };

  return (
    <div className="container mx-auto pt-12 items-center text-center min-h-screen">
      <h2 className="text-2xl pb-12 ">Request access to an Agency.</h2>

      <form
        action="Post"
        className="flex flex-col items-center md:w-1/2 border px-4 py-10 rounded-xl drop-shadow-lg bg-gray-50 mx-auto"
      >
        <select
          defaultValue={"DEFAULT"}
          className="select select-bordered select-accent w-full mb-6"
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
        {errorMessage && (
          <Error
            errorMessage={errorMessage}
            clearError={() => setErrorMessage(null)}
          />
        )}
        <button
          type="submit"
          className="btn btn-accent mt-6 w-full"
          onClick={handleSubmit}
        >
          Request Access
        </button>
      </form>
    </div>
  );
}
