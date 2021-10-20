import React, { useState, useEffect, useContext } from "react";

import SearchBar from "src/components/dashboard/components/documents/SearchBar";
import DocumentView from "src/components/dashboard/components/documents/DocumentView";
import TablePreview from "src/components/dashboard/components/documents/TablePreview";
import ImageView from "src/components/dashboard/components/documents/ImageView";
import CreateMedicine from "src/components/dashboard/components/documents/pages/CreateMedicine";
import CreateProcedure from "src/components/dashboard/components/documents/pages/CreateProcedure";
import CreateProtocol from "src/components/dashboard/components/documents/pages/CreateProtocol";
import FlowView from "src/components/dashboard/components/documents/flow/FlowView";
import UserContext from "src/components/context/UserContext";

export default function ViewDocumentsSection({
  documents,
  setDocuments,
  offline,
  companyImages,
}) {
  const { userData } = useContext(UserContext);

  const [filteredDocuments, setFilteredDocuments] = useState();
  const [currentDocument, setCurrentDocument] = useState({});
  const [searchText, setSearchText] = useState("");
  const [details, setDetails] = useState([]);
  const [tableData, setTableData] = useState();
  const [flowData, setFlowData] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const groupBy = (objectArray, property) => {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
      }, {});
    };
    if (currentDocument.documentDetails) {
      const groupedDetails = groupBy(currentDocument.documentDetails, "label");
      setDetails(Object.entries(groupedDetails));
    }
  }, [currentDocument]);

  useEffect(() => {
    if (
      currentDocument.table_data &&
      currentDocument.table_data.columns.length > 0
    ) {
      setTableData(currentDocument.table_data);
    } else {
      setTableData();
    }
    if (
      currentDocument.flow_data &&
      currentDocument.flow_data.flow_data &&
      currentDocument.flow_data.flow_data.length > 0
    ) {
      setFlowData(currentDocument.flow_data.flow_data);
    } else {
      setFlowData();
    }
  }, [currentDocument]);

  const handleEdit = () => {
    window.scrollTo(0, 0);
    setEdit(true);
  };

  return (
    <div className=" p-4  min-h-screen my-4  z-10">
      {/* <button className="btn" onClick={() => console.log(documents)}>
        log docs
      </button> */}
      {documents ? (
        <div>
          {edit && currentDocument.document_type === "1" && (
            <CreateMedicine
              details={currentDocument}
              tableDetails={currentDocument.table_data}
              flowDetails={currentDocument.flow_data}
              editMode={edit}
              editId={currentDocument.id}
              setEdit={setEdit}
              setDocuments={setDocuments}
            />
          )}
          {edit && currentDocument.document_type === "2" && (
            <CreateProcedure
              details={currentDocument}
              tableDetails={currentDocument.table_data}
              flowDetails={currentDocument.flow_data}
              editMode={edit}
              editId={currentDocument.id}
              setEdit={setEdit}
              setDocuments={setDocuments}
            />
          )}
          {edit && currentDocument.document_type === "3" && (
            <CreateProtocol
              details={currentDocument}
              tableDetails={currentDocument.table_data}
              flowDetails={currentDocument.flow_data}
              editMode={edit}
              editId={currentDocument.id}
              setEdit={setEdit}
              setDocuments={setDocuments}
            />
          )}
          {!edit && (
            <div>
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                currentDocument={currentDocument}
                setCurrentDocument={setCurrentDocument}
                documents={documents}
                filteredDocuments={filteredDocuments}
                setFilteredDocuments={setFilteredDocuments}
                setFlowData={setFlowData}
              />
              <DocumentView
                currentDocument={currentDocument}
                details={details}
              />
              {tableData && <TablePreview tableData={tableData} />}
              {flowData && <FlowView elements={flowData} />}
              {!offline &&
                currentDocument.document_images &&
                currentDocument.document_images.length > 0 &&
                userData.user.employee_type === 4 && (
                  <ImageView
                    currentDocument={currentDocument}
                    editImages={true}
                  />
                )}
              {!offline &&
                currentDocument.document_images &&
                currentDocument.document_images.length > 0 &&
                userData.user.employee_type !== 4 && (
                  <ImageView
                    currentDocument={currentDocument}
                    setDocuments={setDocuments}
                    editImages={false}
                  />
                )}
              {offline &&
                currentDocument.document_images &&
                currentDocument.document_images.length > 0 && (
                  <ImageView
                    currentDocument={currentDocument}
                    setDocuments={setDocuments}
                    editImages={false}
                    companyImages={companyImages}
                    offline={offline}
                  />
                )}
              {!offline &&
                currentDocument.id &&
                userData.user &&
                userData.user.employee_type === 4 && (
                  <div className="flex justify-end p-4 my-12">
                    <button
                      className="btn-warning btn w-1/4"
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              <div>
                {currentDocument.modified && (
                  <div className="text-gray-500 text-right text-sm">
                    Last Updated: {currentDocument.modified.slice(0, 10)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
