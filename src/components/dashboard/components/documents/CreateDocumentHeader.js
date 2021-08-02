import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "../../../../axios";
import UserContext from "../../../context/UserContext";

import LabelList from "./LabelList";

export default function CreateDocumentHeader() {
  const { userData } = useContext(UserContext);

  const initialData = Object.freeze({
    document_type: undefined,
    document_detail_name: "",
    company: undefined,
  });

  const [documentLabels, setDocumentLabels] = useState(null);

  const [documentLabel, setDocumentLabel] = useState(initialData);

  useEffect(() => {
    let mounted = true;

    const getCompanyDocumentLabels = async () => {
      if (userData.user) {
        await axiosInstance
          .get(`/company-document-headers/${userData.user.company}`)
          .then((res) => {
            if (mounted) {
              setDocumentLabels(res.data);
            }
          });
      }
    };

    getCompanyDocumentLabels();

    return () => (mounted = false);
  }, [userData.user]);

  const handleChange = (e) => {
    e.preventDefault();
    setDocumentLabel({
      ...documentLabel,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/document-headers/", {
        document_type: documentLabel.document_type,
        document_detail_name: documentLabel.document_detail_name,
        company: userData.user.company,
      })
      .then(() => {
        axiosInstance
          .get(`/company-document-headers/${userData.user.company}`)
          .then((res) => {
            setDocumentLabels(res.data);
          });
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

      {documentLabels !== null ? (
        <div className="flex flex-row w-full py-12 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-1/3 py-8">
            <div className="text-center text-4xl py-4">Medicine Labels</div>
            <div className="grid flex-grow h-64 card   overflow-auto">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 1
                )}
              />
            </div>
          </div>

          <div className="divider divider-vertical"></div>
          <div className="w-full lg:w-1/3 py-8">
            <div className="text-center text-4xl py-4">Procedure Labels</div>
            <div className="grid flex-grow h-64 card  overflow-auto">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 2
                )}
              />
            </div>
          </div>
          <div className="divider divider-vertical"></div>
          <div className="w-full lg:w-1/3 py-8">
            <div className="text-center text-4xl py-4">Protocol Labels</div>
            <div className="grid flex-grow h-64 card overflow-auto">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 3
                )}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
