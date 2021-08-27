import React, { useState, useContext } from "react";
import DocumentPreview from "./DocumentPreview";
import UserContext from "../../../context/UserContext";
import { axiosInstance } from "../../../../axios";
import { v4 as uuidv4 } from "uuid";
import CreateTableSection from "./CreateTableSection";
import CreateFlowSection from "./CreateFlowSection";

export default function CreateDocument({
  labels,
  documentType,
  details,
  tableDetails,
  flowDetails,
  editMode,
  editId,
  setEdit,
}) {
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

  const initialFlowData = Object.freeze({
    flow_data: [
      {
        id: "db298467-ac3b-4098-a072-b2c568299e24",
        data: { label: "Click on any node to edit it" },
        type: "default",
        position: { x: 314, y: 12 },
        style: {
          width: 250,
          background: "#b0e1ff",
          border: "1px solid black",
          whiteSpace: "pre-wrap",
          color: "black",
        },
      },
      {
        id: "b5271a67-7db5-466b-a8a4-18e6d73644e5",
        data: {
          label: "Press the backspace key after selecting a node to delete it.",
        },
        type: "default",
        position: { x: 489.49364928886416, y: 246.13306796587497 },
        style: {
          width: 400,
          background: "white",
          border: "1px solid black",
          whiteSpace: "pre-wrap",
          color: "red",
        },
      },
      {
        id: "845e2c49-d68e-4879-8ff6-6fadc28a587d",
        data: { label: "Lines can be customized too" },
        type: "default",
        position: { x: 476.9840601587707, y: 133.54676579503385 },
        style: {
          width: 150,
          background: "#fcffa4",
          border: "1px solid black",
          whiteSpace: "pre-wrap",
          color: "black",
        },
      },
      {
        id: "reactflow__edge-db298467-ac3b-4098-a072-b2c568299e24null-845e2c49-d68e-4879-8ff6-6fadc28a587dnull",
        type: "custom",
        animated: true,
        data: { label: "Click" },
        source: "db298467-ac3b-4098-a072-b2c568299e24",
        target: "845e2c49-d68e-4879-8ff6-6fadc28a587d",
      },
      {
        id: "reactflow__edge-845e2c49-d68e-4879-8ff6-6fadc28a587dnull-b5271a67-7db5-466b-a8a4-18e6d73644e5null",
        type: "custom",
        animated: false,
        data: { label: "" },
        source: "845e2c49-d68e-4879-8ff6-6fadc28a587d",
        target: "b5271a67-7db5-466b-a8a4-18e6d73644e5",
      },
    ],
  });

  const [newDocumentDetails, setNewDocumentDetails] = useState(
    details || initialDetails
  );
  const [detail, setDetail] = useState({});
  const [documentName, setDocumentName] = useState("");
  const [tableData, setTableData] = useState(tableDetails || initialTableData);
  const [flowData, setFlowData] = useState(flowDetails || initialFlowData);

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
      flow_data: flowData,
    });
  };

  const submitEdits = () => {
    axiosInstance
      .patch(`/documents/${editId}/`, {
        company: userData.user.company,
        document_type: documentType,
        document_name: newDocumentDetails.document_name,
        documentDetails: newDocumentDetails.documentDetails,
        table_data: tableData,
        flow_data: flowData,
      })
      .then(() => {
        setEdit(false);
      });
  };

  // const logData = () => {
  //   console.log(editId);
  // };

  return (
    <div className="container mx-auto">
      {editMode ? (
        <div>
          <button className="btn btn-info" onClick={submitEdits}>
            Confirm Edits
          </button>
          <button className="btn btn-warning" onClick={() => setEdit(false)}>
            Cancel Edits
          </button>
        </div>
      ) : (
        <button className="btn" onClick={submitDocument}>
          submit data
        </button>
      )}

      {/* <button className="btn" onClick={logData}>
        Log Data
      </button> */}
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
      <CreateFlowSection
        flowData={flowData}
        setFlowData={setFlowData}
        initialFlowData={initialFlowData}
      />
    </div>
  );
}
