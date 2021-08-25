import React, { useState, useEffect } from "react";

import ViewDocumentsPage from "./pages/ViewDocumentsSection.js";

export default function ViewDocuments({
  companyDocuments,
  setCompanyDocuments,
}) {
  const [documentFocus, setDocumentFocus] = useState(1);
  const [medicines, setMedicines] = useState();
  const [procedures, setProcedures] = useState();
  const [protocols, setProtocols] = useState();

  const focusHandler = (docId) => {
    setDocumentFocus(docId);
  };

  const logData = () => {
    console.log(companyDocuments);
  };

  useEffect(() => {
    if (companyDocuments.length > 0) {
      const filteredDocuments = (documentType) =>
        companyDocuments.filter(
          (document) => document.document_type === documentType
        );
      setMedicines(filteredDocuments("1"));
      setProcedures(filteredDocuments("2"));
      setProtocols(filteredDocuments("3"));
    }
  }, [companyDocuments]);

  return (
    <div className=" min-h-screen">
      {/* <button className="btn" onClick={logData}>
        logData
      </button> */}
      <div className="tabs tabs-boxed p-4">
        <div
          onClick={() => {
            focusHandler(1);
          }}
          className={
            documentFocus === 1 ? "tab tab-lg tab-active" : "tab tab-lg"
          }
        >
          Medicine
        </div>
        <div
          onClick={() => {
            focusHandler(2);
          }}
          className={
            documentFocus === 2 ? "tab tab-lg tab-active" : "tab tab-lg"
          }
        >
          Procedure
        </div>
        <div
          onClick={() => {
            focusHandler(3);
          }}
          className={
            documentFocus === 3 ? "tab tab-lg tab-active" : "tab tab-lg"
          }
        >
          Protocol
        </div>
      </div>
      <div>
        {documentFocus === 1 && <ViewDocumentsPage documents={medicines} />}
      </div>
      <div>
        {documentFocus === 2 && <ViewDocumentsPage documents={procedures} />}
      </div>
      <div>
        {documentFocus === 3 && <ViewDocumentsPage documents={protocols} />}
      </div>
    </div>
  );
}
