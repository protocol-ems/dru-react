import React, { useState, useContext } from "react";
import { axiosInstance } from "../../../../axios";
import UserContext from "../../../context/UserContext";

export default function CreateDocumentHeader() {
  const { userData } = useContext(UserContext);

  const initialData = Object.freeze({
    document_type: undefined,
    document_detail_name: "",
    company: undefined,
  });

  const [documentLabel, setDocumentLabel] = useState(initialData);

  const handleChange = (e) => {
    e.preventDefault();
    setDocumentLabel({
      ...documentLabel,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/document-headers/", {
      document_type: documentLabel.document_type,
      document_detail_name: documentLabel.document_detail_name,
      company: userData.user.company,
    });
  };

  return (
    <div className="container mx-auto my-24">
      <div className="text-3xl pb-12">
        Create a label for your Medicine, Procedure, or Protocol
      </div>
      <form className="form-control">
        <select
          className="select select-bordered select-accent w-full max-w-xs"
          defaultValue={"DEFAULT"}
          onChange={handleChange}
          name="document_type"
        >
          <option disabled="disabled" value="DEFAULT">
            Label Category
          </option>
          <option value="1">Medicine</option>
          <option value="2">Procedure</option>
          <option value="3">Protocol</option>
        </select>
        <label className="label">
          <span className="label-text">Label</span>
        </label>
        <input
          type="text"
          placeholder="label"
          className="input input-bordered input-accent"
          onChange={handleChange}
          name="document_detail_name"
        ></input>

        <button
          type="submit"
          className="w-full px-16 py-2 my-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-green-300 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-400"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
}
