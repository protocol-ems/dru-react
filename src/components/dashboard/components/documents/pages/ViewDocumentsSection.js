import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar";
import DocumentView from "../DocumentView";

export default function ViewDocumentsSection({ documents }) {
  const [filteredDocuments, setFilteredDocuments] = useState();
  const [currentDocument, setCurrentDocument] = useState({});
  const [searchText, setSearchText] = useState("");
  const [details, setDetails] = useState([]);

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

  return (
    <div>
      <button className="btn" onClick={() => console.log(currentDocument)}>
        log docs
      </button>
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
    </div>
  );
}
