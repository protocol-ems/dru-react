import React, { useState, useContext } from "react";
import DocumentPreview from "./DocumentPreview";
import UserContext from "../../../context/UserContext";
import { axiosInstance } from "../../../../axios";
import { v4 as uuidv4 } from "uuid";
import CreateTableSection from "./CreateTableSection";
// import MyEditor from "./MyEditor";

export default function CreateDocument({ labels, documentType }) {
  const { userData } = useContext(UserContext);

  const initialDetails = Object.freeze({
    document_name: undefined,
    documentDetails: [],
    table_data: {},
  });

  const initialTableData = Object.freeze({
    columns: [],
    rows: [],
    table_description: "",
  });

  const [newDocumentDetails, setNewDocumentDetails] = useState(initialDetails);
  const [detail, setDetail] = useState({});
  const [documentName, setDocumentName] = useState("");
  const [tableData, setTableData] = useState(initialTableData);

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
    e.target.parentElement.children[0].value = "";
  };

  const documentTypeSetter = (documentType) => {
    switch (documentType) {
      case "1":
        return "Medicine";
      case "2":
        return "Procedure";
      case "3":
        return "Protocol";
      default:
        return "N/A";
    }
  };

  const submitDocument = () => {
    axiosInstance.post("/documents/", {
      company: userData.user.company,
      document_type: documentType,
      document_name: newDocumentDetails.document_name,
      documentDetails: newDocumentDetails.documentDetails,
      table_data: tableData,
    });
  };

  const logData = () => {
    console.log(tableData);
  };

  return (
    <div className="container mx-auto">
      <button className="btn" onClick={submitDocument}>
        submit data
      </button>
      <button className="btn" onClick={logData}>
        Log Data
      </button>
      <div className="text-4xl  text-center">Preview</div>
      <div className="border my-12 ">
        <DocumentPreview
          documentDetails={newDocumentDetails}
          setDocumentDetails={setNewDocumentDetails}
          labels={labels}
        />
      </div>
      <div className="form-control md:w-1/2 mx-auto flex flex-col">
        <div className="flex flex-col">
          <label className="lable py-4">
            <span className="font-bold text-3xl">
              {documentTypeSetter(documentType) + " Name"}
            </span>
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
                  className=" mx-auto  flex flex-col p-4 w-full my-4 md:ml-12 md:w-5/12"
                >
                  <div className="collapse w-full border rounded-box border-base-300 collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title text-2xl font-bold">
                      {label.document_detail_name}
                    </div>
                    <div className="collapse-content">
                      <textarea
                        className=" border outline-none rounded-xl p-4 w-full"
                        name={label.document_detail_name}
                        id={uuidv4()}
                        cols="20"
                        rows="10"
                        onChange={handleDetailChange}
                      ></textarea>
                      <button
                        name={label.document_detail_name}
                        onClick={addDetail}
                        className="btn btn-accent my-4  justify-center w-full"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}

        <CreateTableSection
          tableData={tableData}
          setTableData={setTableData}
          initialTableData={initialTableData}
        />
      </div>
    </div>
  );
}
