import React, { useEffect } from "react";

export default function SearchBar({
  searchText,
  setSearchText,
  currentDocument,
  setCurrentDocument,
  documents,
  filteredDocuments,
  setFilteredDocuments,
}) {
  const searchHandler = (e) => {
    const newSearch = e.target.value;
    e.preventDefault();
    setSearchText(newSearch.toLowerCase());
  };

  useEffect(() => {
    if (documents) {
      // console.log(documents);
      const documentList = documents.filter(
        (document) =>
          document.document_name.toLowerCase().indexOf(searchText) !== -1 &&
          searchText.length > 1
      );

      setFilteredDocuments(documentList);
      // for (let i = 0; i < documents.length; i++) {
      //   if (
      //     documents[i].document_name.toLowerCase().includes(searchText) &&
      //     searchText.length > 1
      //   ) {
      //     console.log(documents[i]);
      //     setCurrentDocument(documents[i]);
      //     break;
      //   } else {
      //     setCurrentDocument({});
      //   }
      // }
    }
  }, [searchText, setCurrentDocument, documents, setFilteredDocuments]);

  return (
    <div>
      <div className="flex flex-col mb-4 rounded md:items-center">
        <label className="mb-2 uppercase font-bold text-lg text-green-400">
          Search
        </label>
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
    </div>
  );
}
