import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar";
import DocumentView from "../DocumentView";
import TablePreview from "../TablePreview";
import FlowView from "../flow/FlowView";

export default function ViewDocumentsSection({ documents }) {
  const [filteredDocuments, setFilteredDocuments] = useState();
  const [currentDocument, setCurrentDocument] = useState({});
  const [searchText, setSearchText] = useState("");
  const [details, setDetails] = useState([]);
  const [tableData, setTableData] = useState();
  const [flowData, setFlowData] = useState();

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

  return (
    <div className="border p-4 rounded-xl min-h-screen my-4 shadow-xl">
      <button
        className="btn"
        onClick={() => console.log(currentDocument.flow_data.flow_data)}
      >
        log docs
      </button>
      {documents ? (
        <div>
          {" "}
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            currentDocument={currentDocument}
            setCurrentDocument={setCurrentDocument}
            documents={documents}
            filteredDocuments={filteredDocuments}
            setFilteredDocuments={setFilteredDocuments}
          />
          <DocumentView currentDocument={currentDocument} details={details} />
          {tableData ? <TablePreview tableData={tableData} /> : ""}
          {flowData ? <FlowView elements={flowData} /> : ""}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
