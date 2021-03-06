import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DocumentPreview from "src/components/dashboard/components/documents/DocumentPreview";
import CreateTableSection from "src/components/dashboard/components/documents/CreateTableSection";
import CreateFlowSection from "src/components/dashboard/components/documents/CreateFlowSection";
import UserContext from "src/components/context/UserContext";
import { axiosInstance } from "src/axiosInstance";
import Error from "src/components/misc/Error";

export default function CreateDocument({
  labels,
  documentType,
  details,
  tableDetails,
  flowDetails,
  editMode,
  editId,
  setEdit,
  setDocuments,
}) {
  const history = useHistory();
  const { userData } = useContext(UserContext);

  const initialDetails = Object.freeze({
    document_name: "",
    documentDetails: [],
    table_data: {},
  });

  const initialTableData = Object.freeze({
    columns: [],
    rows: [],
    table_description: "",
  });

  const initialFlowData = Object.freeze({
    flow_data: [],
  });

  const [newDocumentDetails, setNewDocumentDetails] = useState(
    details || initialDetails
  );

  const documentError = useRef(null);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [detail, setDetail] = useState({});
  const [tableData, setTableData] = useState(tableDetails || initialTableData);
  const [flowData, setFlowData] = useState(flowDetails || initialFlowData);
  const [deleteDocument, setDeleteDocument] = useState(false);

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
    setNewDocumentDetails({
      ...newDocumentDetails,
      document_name: e.target.value,
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
    if (newDocumentDetails.document_name.indexOf("/") !== -1) {
      window.scrollTo(0, documentError.current.offsetTop - 25);
      setErrorMessage("' / 's are not allowed in the name");
    }
    if (newDocumentDetails.document_name.length < 1) {
      window.scrollTo(0, documentError.current.offsetTop - 25);
      setErrorMessage("Please name the Document");
    }
    if (
      newDocumentDetails.document_name.length > 1 &&
      newDocumentDetails.document_name.indexOf("/") === -1
    ) {
      axiosInstance
        .post("/documents/", {
          company: userData.user.company,
          document_type: documentType,
          document_name: newDocumentDetails.document_name,
          documentDetails: newDocumentDetails.documentDetails,
          table_data: tableData,
          flow_data: flowData,
        })
        .then(() => history.push("/dashboard"));
    }
  };

  const submitEdits = () => {
    // right now all the data is being 're-patched' seems like this could be troublesome. It might be nice to only patch what is changed. But I am not sure. 9/6

    if (newDocumentDetails.document_name.indexOf("/") !== -1) {
      window.scrollTo(0, documentError.current.offsetTop - 25);
      setErrorMessage("' / 's are not allowed in the name");
    }
    if (newDocumentDetails.document_name.length < 1) {
      window.scrollTo(0, documentError.current.offsetTop - 25);
      setErrorMessage("Please name the Document");
    }

    if (
      newDocumentDetails.document_name.length > 1 &&
      newDocumentDetails.document_name.indexOf("/") === -1
    ) {
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
          getCompanyDocuments();
        })
        .then(() => {
          window.scrollTo(0, 0);
          setEdit(false);
        });
    }
  };

  const submitDelete = () => {
    axiosInstance
      .delete(`/documents/${editId}/`)
      .then(() => {
        getCompanyDocuments();
      })
      .then(() => {
        window.scrollTo(0, 0);
        setEdit(false);
      });
  };

  const cancelEdits = () => {
    setEdit(false);
    window.scrollTo(0, 0);
  };

  const getCompanyDocuments = async () => {
    let companyId = userData.user.company || 1;
    await axiosInstance.get(`company-documents/${companyId}/`).then((res) => {
      setDocuments(res.data);
      localStorage.setItem("documents", JSON.stringify(res.data));
    });
  };

  // const logData = () => {
  //   console.log(editId);
  // };

  return (
    <div className="container mx-auto">
      {/* <button className="btn" onClick={logData}>
        Log Data
      </button> */}
      <div className="text-4xl  text-center mt-12">Preview</div>
      <div className="border my-12 ">
        <DocumentPreview
          documentDetails={newDocumentDetails}
          setDocumentDetails={setNewDocumentDetails}
          labels={labels}
        />
      </div>
      <div className="form-control md:w-1/2 mx-auto flex flex-col">
        <div className="flex flex-col">
          <div ref={documentError}>
            {errorMessage && (
              <Error
                errorMessage={errorMessage}
                clearError={() => setErrorMessage(undefined)}
              />
            )}
          </div>
          <label className="lable py-4">
            <span className="font-bold text-3xl">
              {documentTypeSetter(documentType) + " Name"}
            </span>
          </label>
          <input
            className="input input-bordered input-accent "
            type="text"
            name="document_name"
            placeholder="Please enter a name"
            onChange={handleDocumentNameChange}
            value={newDocumentDetails.document_name}
          />
          {/* <button className="btn btn-accent mt-4" onClick={addDocumentName}>
            Add
          </button> */}
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
      {editMode ? (
        <div className="flex justify-around items-center flex-col md:items-start md:flex-row ">
          <button
            className="btn btn-info w-full md:w-1/4 my-6"
            onClick={submitEdits}
          >
            Confirm Edits
          </button>
          <button
            className="btn btn-warning w-full md:w-1/4 my-6"
            onClick={() => cancelEdits()}
          >
            Cancel Edits
          </button>
          <button
            className="btn md:w-1/4  w-full my-6"
            onClick={() => setDeleteDocument(true)}
          >
            Delete
          </button>
        </div>
      ) : (
        <button className="btn btn-info w-full my-12 " onClick={submitDocument}>
          Create Document
        </button>
      )}
      {deleteDocument && (
        <button
          className="btn btn-error   w-full my-6"
          onClick={() => submitDelete()}
        >
          Confirm Delete
        </button>
      )}
    </div>
  );
}
