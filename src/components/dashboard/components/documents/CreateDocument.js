import React, { useState, useContext } from "react";
import DocumentDisplay from "./DocumentDisplay";
import UserContext from "../../../context/UserContext";
import { axiosInstance } from "../../../../axios";
import { v4 as uuidv4 } from "uuid";
// import MyEditor from "./MyEditor";

export default function CreateDocument({ labels, documentType }) {
  const { userData } = useContext(UserContext);

  const initialDetails = Object.freeze({
    document_name: undefined,
    documentDetails: [],
  });

  const [newDocumentDetails, setNewDocumentDetails] = useState(initialDetails);
  const [detail, setDetail] = useState({});
  const [documentName, setDocumentName] = useState("");

  const handleDetailChange = (e) => {
    //need a different way to handle the id. will come back.

    e.preventDefault();
    setDetail({
      label: e.target.name,
      id: e.target.id,
      value: e.target.value.trim(),
    });
  };

  const handleDocumentNameChange = (e) => {
    e.preventDefault();
    setDocumentName(e.target.value);
  };

  const addDocumentName = (e) => {
    e.preventDefault();
    setNewDocumentDetails({
      ...newDocumentDetails,
      document_name: documentName,
    });
  };

  const addDetail = (e) => {
    e.preventDefault();
    let newDetailSet = newDocumentDetails.documentDetails;

    newDetailSet.push(detail);

    setNewDocumentDetails({
      ...newDocumentDetails,
      documentDetails: newDetailSet,
    });

    setDetail({});
    // this can  be done better.
    e.target.parentElement.children[1].value = "";
  };

  const submitDocument = () => {
    axiosInstance.post("/documents/", {
      company: userData.user.company,
      document_type: documentType,
      document_name: newDocumentDetails.document_name,
      documentDetails: newDocumentDetails.documentDetails,
    });
  };

  const logData = () => {
    let filteredArr = newDocumentDetails.documentDetails.filter(
      (document) => document.label === "Actions"
    );
    let arr = [];
    filteredArr.map((value) => {
      arr.push(value.value);
    });
    console.log(arr);
    console.log(newDocumentDetails.documentDetails.length);
  };

  return (
    <div className="container mx-auto">
      <button className="btn" onClick={submitDocument}>
        submit data
      </button>
      <button className="btn" onClick={logData}>
        Log Data
      </button>
      <div className="text-4xl  text-center">Preview of the document</div>
      <div className="border my-12">
        <DocumentDisplay documentDetails={newDocumentDetails} labels={labels} />
      </div>
      <div className="form-control md:w-1/2 md:ml-12 flex flex-col">
        <div className="flex flex-col">
          <label className="lable py-4">
            <span>Medicine Name</span>
          </label>
          <input
            className="input input-bordered input-accent "
            type="text"
            name="document_name"
            onChange={handleDocumentNameChange}
          />
          <button className="btn btn-accent mt-4" onClick={addDocumentName}>
            Add
          </button>
        </div>
      </div>
      <div className=" flex flex-wrap py-12">
        {labels
          ? labels.map((label) => {
              return (
                <div
                  key={label.id}
                  className=" mx-auto border rounded shadow flex flex-col p-4 w-full my-4 md:ml-12 md:w-5/12"
                >
                  <div className="text-3xl text-center py-4">
                    {label.document_detail_name}
                  </div>
                  <textarea
                    className="border outline-none rounded-xl p-4"
                    name={label.document_detail_name}
                    id={uuidv4()}
                    cols="20"
                    rows="10"
                    onChange={handleDetailChange}
                  ></textarea>
                  <button
                    name={label.document_detail_name}
                    // id={label.id}
                    onClick={addDetail}
                    className="btn btn-accent my-4  justify-center"
                  >
                    Add
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
