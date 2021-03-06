import React, { useState, useEffect } from "react";

import ViewDocumentsSection from "./pages/ViewDocumentsSection.js";

export default function ViewDocuments({
  companyDocuments,
  setCompanyDocuments,
  offline,
  companyImages,
  loading,
}) {
  const [documentFocus, setDocumentFocus] = useState(1);
  const [medicines, setMedicines] = useState();
  const [procedures, setProcedures] = useState();
  const [protocols, setProtocols] = useState();

  const focusHandler = (docId) => {
    setDocumentFocus(docId);
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
    <div className="border  shadow-xl rounded-xl">
      <div className="flex justify-around p-4 ">
        <div
          onClick={() => {
            focusHandler(1);
          }}
          className={
            documentFocus === 1
              ? "font-bold md:text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-2 md:p-4"
              : " md:text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer md:p-4 "
          }
        >
          Medicine
        </div>
        <div
          onClick={() => {
            focusHandler(2);
          }}
          className={
            documentFocus === 2
              ? "font-bold md:text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-2 md:p-4"
              : "md:text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer md:p-4"
          }
        >
          Procedure
        </div>
        <div
          onClick={() => {
            focusHandler(3);
          }}
          className={
            documentFocus === 3
              ? "font-bold md:text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-2 md:p-4"
              : "md:text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer md:p-4"
          }
        >
          Protocol
        </div>
      </div>

      <div>
        {documentFocus === 1 && (
          <ViewDocumentsSection
            documents={medicines}
            setDocuments={setCompanyDocuments}
            offline={offline}
            companyImages={companyImages}
            loading={loading}
          />
        )}
      </div>
      <div>
        {documentFocus === 2 && (
          <ViewDocumentsSection
            documents={procedures}
            setDocuments={setCompanyDocuments}
            offline={offline}
            companyImages={companyImages}
            loading={loading}
          />
        )}
      </div>
      <div>
        {documentFocus === 3 && (
          <ViewDocumentsSection
            documents={protocols}
            setDocuments={setCompanyDocuments}
            offline={offline}
            companyImages={companyImages}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
