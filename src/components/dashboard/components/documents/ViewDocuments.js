import React, { useState, useEffect } from "react";

import ViewDocumentsSection from "./pages/ViewDocumentsSection.js";

export default function ViewDocuments({ companyDocuments }) {
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
    <div className="border  shadow-xl rounded-xl my-12">
      <div className="flex justify-around p-4 ">
        <div
          onClick={() => {
            focusHandler(1);
          }}
          className={
            documentFocus === 1
              ? "font-bold text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-4"
              : " text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer p-4"
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
              ? "font-bold text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-4"
              : "text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer p-4"
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
              ? "font-bold text-2xl uppercase text-black w-full text-center border-l-2 border-t-2 border-r-2 cursor-pointer shadow-inner p-4"
              : "text-2xl uppercase text-gray-500 w-full text-center border-b-2 cursor-pointer p-4"
          }
        >
          Protocol
        </div>
      </div>

      <div>
        {documentFocus === 1 && <ViewDocumentsSection documents={medicines} />}
      </div>
      <div>
        {documentFocus === 2 && <ViewDocumentsSection documents={procedures} />}
      </div>
      <div>
        {documentFocus === 3 && <ViewDocumentsSection documents={protocols} />}
      </div>
    </div>
    // <div>
    //   <div className="tabs tabs-boxed p-4 ">
    //     <div
    //       onClick={() => {
    //         focusHandler(1);
    //       }}
    //       className={
    //         documentFocus === 1 ? "tab tab-lg tab-active" : "tab tab-lg"
    //       }
    //     >
    //       Medicine
    //     </div>
    //     <div
    //       onClick={() => {
    //         focusHandler(2);
    //       }}
    //       className={
    //         documentFocus === 2 ? "tab tab-lg tab-active" : "tab tab-lg"
    //       }
    //     >
    //       Procedure
    //     </div>
    //     <div
    //       onClick={() => {
    //         focusHandler(3);
    //       }}
    //       className={
    //         documentFocus === 3 ? "tab tab-lg tab-active" : "tab tab-lg"
    //       }
    //     >
    //       Protocol
    //     </div>
    //   </div>

    //   <div>
    //     {documentFocus === 1 && <ViewDocumentsSection documents={medicines} />}
    //   </div>
    //   <div>
    //     {documentFocus === 2 && <ViewDocumentsSection documents={procedures} />}
    //   </div>
    //   <div>
    //     {documentFocus === 3 && <ViewDocumentsSection documents={protocols} />}
    //   </div>
    // </div>
  );
}
