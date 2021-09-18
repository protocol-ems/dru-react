import React, { useEffect } from "react";


export default function SearchBar({
  searchText,
  setSearchText,
  currentDocument,
  setCurrentDocument,
  documents,
  filteredDocuments,
  setFilteredDocuments,
  setFlowData,
}) {
  const searchHandler = (e) => {
    const newSearch = e.target.value;
    e.preventDefault();
    setSearchText(newSearch.toLowerCase());
  };

  useEffect(() => {
    if (documents) {
      const documentList = documents.filter(
        (document) =>
          document.document_name.toLowerCase().indexOf(searchText) !== -1 &&
          searchText.length > 0
      );

      setFilteredDocuments(documentList);
    }
    if (documents && searchText.length === 0 && documents.length > 1) {
      setFilteredDocuments(documents);
      setCurrentDocument(documents[0]);
    }
  }, [searchText, setCurrentDocument, documents, setFilteredDocuments]);

  const setDocumentHandler = (index) => {
    //setFlowData is being used here to force a rerender.
    // If a person clicks on one document that has a flow chart and the previous document had a flow chart
    // the rerender will force the flow chart to be centered
    setFlowData();
    setCurrentDocument(filteredDocuments[index]);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-4 rounded md:items-center ">
        <label className="mb-2 uppercase font-bold text-2xl bold">Search</label>

        <input
          value={searchText}
          onChange={searchHandler}
          className="border py-2 px-3 text-grey-darkest rounded md:w-1/3"
          type="text"
          name="search"
          id="search"
          autoComplete="off"
        ></input>
      </div>
      <div className="flex overflow-auto p-2 m-2   scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
        {filteredDocuments
          ? filteredDocuments.map((document, index) => {
              return (
                <button
                  key={document.id}
                  className="btn btn-outline btn-accent mx-2"
                  onClick={() => {
                    setDocumentHandler(index);
                  }}
                >
                  {document.document_name}
                </button>
              );
            })
          : ""}
      </div>
    </div>
  );
}
