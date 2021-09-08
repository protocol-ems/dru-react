import React, { useState, useContext, useEffect } from "react";
import { axiosInstance } from "../../../../axios";
import UserContext from "../../../context/UserContext";

import LabelList from "./LabelList";
import Error from "../../../misc/Error";

export default function CreateDocumentHeader() {
  const { userData } = useContext(UserContext);

  const initialData = Object.freeze({
    document_type: undefined,
    document_detail_name: "",
    company: undefined,
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

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
      .catch((err) => {
        err
          ? setErrorMessage(
              "Please select a label category and the label cannot be blank."
            )
          : setErrorMessage(undefined);
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
      {errorMessage && (
        <Error
          errorMessage={errorMessage}
          clearError={() => setErrorMessage(undefined)}
        />
      )}
      <form className="form-control bg-gray-50 p-8 rounded-xl shadow-xl relative h-64">
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
          placeholder="Label"
          className="input input-bordered input-accent"
          onChange={handleChange}
          name="document_detail_name"
        ></input>

        <button
          type="submit"
          className="absolute bottom-0 right-0 w-1/2 h-16 py-2 my-2 text-base text-white transition duration-500 ease-in-out transform bg-green-300 border-green-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-400"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>

      {documentLabels !== null ? (
        <div className="flex flex-col w-full pt-24 ">
          <div className="text-center text-4xl py-4">Medicine Labels</div>
          <div className="grid card rounded-box">
            <div className="h-64 overflow-auto scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 1
                )}
                setLabels={setDocumentLabels}
              />
            </div>
          </div>

          <div className="divider"></div>

          <div className="text-center text-4xl py-4">Procedure Labels</div>
          <div className="grid card  rounded-box">
            <div className="h-64 overflow-auto">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 2
                )}
                setLabels={setDocumentLabels}
              />
            </div>
          </div>
          <div className="divider"></div>

          <div className="text-center text-4xl py-4">Protocol Labels</div>
          <div className="grid card  rounded-box">
            <div className="h-64 overflow-auto">
              <LabelList
                labels={documentLabels.filter(
                  (label) => label.document_type === 3
                )}
                setLabels={setDocumentLabels}
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
