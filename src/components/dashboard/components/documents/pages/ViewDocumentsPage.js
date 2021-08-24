import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar";

export default function ViewDocumentsPage({ documents }) {
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
      {/* <button className="btn" onClick={() => console.log(details)}>
        log docs
      </button> */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        currentDocument={currentDocument}
        setCurrentDocument={setCurrentDocument}
        documents={documents}
        filteredDocuments={filteredDocuments}
        setFilteredDocuments={setFilteredDocuments}
      />
      <div>
        <div className="flex">
          {filteredDocuments
            ? filteredDocuments.map((document, index) => {
                return (
                  <button
                    key={document.id}
                    className="btn"
                    onClick={() => {
                      setCurrentDocument(filteredDocuments[index]);
                    }}
                  >
                    {document.document_name}
                  </button>
                );
              })
            : ""}
        </div>
        <div>
          {currentDocument.document_name ? (
            <div className="w-full mx-auto mb-24 text-left">
              <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 uppercase">
                {currentDocument.document_name}
              </h2>

              <ul className="flex items-start gap-8 flex-wrap">
                {details
                  ? details.map((detail) => {
                      return (
                        <li className="w-2/5" key={detail[0]}>
                          <div className="text-lg font-medium leading-6 text-green-400">
                            {detail[0]}
                          </div>
                          <ul className="mt-2 list-disc">
                            {detail[1].map((point) => {
                              return (
                                <li
                                  key={point.id}
                                  id={point.id}
                                  className="whitespace-pre-line text-base leading-6 text-gray-600 m-4"
                                >
                                  {point.value}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
