import React, { useState, useContext } from "react";
import DocumentPreview from "./DocumentPreview";
import UserContext from "../../../context/UserContext";
import { axiosInstance } from "../../../../axios";
import { v4 as uuidv4 } from "uuid";
import CreateTableSection from "./CreateTableSection";
import CreateFlowSection from "./CreateFlowSection";
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

  const initialFlowData = Object.freeze({
    flow_data: [
      {
        id: "randomnode_1629218456334",
        type: "default",
        data: { label: "Assess Appropriateness for clinical condition" },
        position: { x: 529, y: 185 },
        style: {
          background: "#f4f0ec",
          color: "black",
          border: "1px solid black",
          width: 250,
        },
      },
      {
        id: "randomnode_1629218467681",
        type: "default",
        data: { label: "Heart rate typically <50/min if bradyarrhythmia" },
        position: { x: 528, y: 256 },
        style: {
          background: "white",
          color: "black",
          border: "1px solid black",
          width: 150,
        },
      },
      {
        id: "randomnode_1629219637494",
        type: "default",
        data: { label: "Identify and treat underlying cause" },
        position: { x: 721.1307046705919, y: 264.0069171921567 },
        style: {
          background: "white",
          color: "black",
          border: "1px solid black",
          width: 150,
        },
      },
      {
        id: "randomnode_1629219740583",
        type: "default",
        data: {
          label:
            "• Maintain patent airway; assist breathing as necessary\n• Oxygen Therapy, high flow\n• Cardiac monitor to identify rhythm; monitor blood pressure and oximetry\n• IV or IO access\n• 12-lead ECG if available; don’t delay therapy",
        },
        position: { x: 532.0460741590982, y: 326.63117844487016 },
        style: {
          background: "#f4f0ec",
          color: "black",
          border: "1px solid black",
          width: 250,
          whiteSpace: "pre-wrap",
        },
      },
      {
        id: "randomnode_1629219802290",
        type: "default",
        data: {
          label:
            "Persistent bradyarrhythmia\ncausing:\n• Hypotension?\n• Acutely altered mental status?\n• Signs of shock?\n• Ischemic chest discomfort?",
        },
        style: {
          background: "#f4f0ec",
          color: "black",
          border: "1px solid black",
          width: 250,
          whiteSpace: "pre",
        },
        position: { x: 530.0530454379535, y: 476.77267543777583 },
      },
      {
        id: "reactflow__edge-randomnode_1629218456334null-randomnode_1629218467681null",
        type: "custom",
        animated: false,
        data: { label: "" },
        source: "randomnode_1629218456334",
        target: "randomnode_1629218467681",
      },
      {
        id: "reactflow__edge-randomnode_1629218467681null-randomnode_1629219637494null",
        type: "custom",
        animated: false,
        data: { label: "" },
        source: "randomnode_1629218467681",
        target: "randomnode_1629219637494",
      },
      {
        id: "reactflow__edge-randomnode_1629219637494null-randomnode_1629219740583null",
        type: "custom",
        animated: false,
        data: { label: "" },
        source: "randomnode_1629219637494",
        target: "randomnode_1629219740583",
      },
      {
        id: "reactflow__edge-randomnode_1629219740583null-randomnode_1629219802290null",
        type: "custom",
        animated: false,
        data: { label: "" },
        source: "randomnode_1629219740583",
        target: "randomnode_1629219802290",
      },
      {
        id: "randomnode_1629220391621",
        type: "default",
        data: { label: "Monitor and observe" },
        position: { x: 746.5145564414969, y: 577.2620121292716 },
        style: {
          background: "white",
          color: "black",
          border: "1px solid black",
          width: 150,
        },
      },
      {
        id: "reactflow__edge-randomnode_1629219802290null-randomnode_1629220391621null",
        type: "custom",
        animated: false,
        data: { label: "no" },
        source: "randomnode_1629219802290",
        target: "randomnode_1629220391621",
      },
      {
        id: "randomnode_1629220458661",
        type: "default",
        data: { label: "Atropine" },
        position: { x: 554.9081575314698, y: 614.1981854131323 },
        style: {
          background: "white",
          color: "black",
          border: "1px solid black",
          width: 150,
        },
      },
      {
        id: "reactflow__edge-randomnode_1629219802290null-randomnode_1629220458661null",
        type: "custom",
        animated: false,
        data: { label: "Yes" },
        source: "randomnode_1629219802290",
        target: "randomnode_1629220458661",
      },
      {
        id: "randomnode_1629220736716",
        type: "default",
        data: { label: "Transcutaneous pacing" },
        position: { x: 702.6528506669124, y: 722.698194434473 },
        style: {
          background: "white",
          color: "black",
          border: "1px solid black",
          width: 150,
        },
      },
      {
        id: "reactflow__edge-randomnode_1629220458661null-randomnode_1629220736716null",
        type: "custom",
        animated: false,
        data: { label: "If atropine ineffective:" },
        source: "randomnode_1629220458661",
        target: "randomnode_1629220736716",
      },
    ],
  });

  const [newDocumentDetails, setNewDocumentDetails] = useState(initialDetails);
  const [detail, setDetail] = useState({});
  const [documentName, setDocumentName] = useState("");
  const [tableData, setTableData] = useState(initialTableData);
  const [flowData, setFlowData] = useState(initialFlowData);

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
      <CreateFlowSection
        flowData={flowData}
        setFlowData={setFlowData}
        initialFlowData={initialFlowData}
      />
    </div>
  );
}
