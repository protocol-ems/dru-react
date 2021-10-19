import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "src/components/context/UserContext";

export default function ImageCenter({ companyDocuments }) {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const [image, setImage] = useState();
  const [imageFormat, setImageFormat] = useState(false);
  const [document, setDocument] = useState();
  const [medicines, setMedicines] = useState();
  const [procedures, setProcedures] = useState();
  const [protocols, setProtocols] = useState();
  const [documentFocus, setDocumentFocus] = useState(1);

  const newImage = () => {
    const uploadData = new FormData();

    uploadData.append("image", image);
    uploadData.append("document", document);
    uploadData.append("company", userData.user.company);

    fetch("https://dru-alpha-qq2bd.ondigitalocean.app/images/", {
      method: "POST",
      body: uploadData,
    }).then(() => {
      history.push("/dashboard");

      window.scrollTo(0, 0);
    });
  };

  const handleChange = (e) => {
    setDocument(e.target.value);
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

  const focusHandler = (docId) => {
    setDocumentFocus(docId);
    setDocument(undefined);
  };

  useEffect(() => {
    const supportedFormats = (type) => {
      const supportedFileTypes = [
        "image/jpg",
        "image/gif",
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/webp",
      ];
      let fileCheck = supportedFileTypes.indexOf(type);
      if (fileCheck === -1) {
        setImageFormat(false);
      } else {
        setImageFormat(true);
      }
    };
    if (image) {
      supportedFormats(image.type);
    }
  }, [image]);

  return (
    <div>
      {companyDocuments.length > 0 && (
        <div>
          <div className="text-2xl text-gray-500">
            Choose an image to upload. Then choose a Medicine, Procedure, or
            Protocol to upload it to.
          </div>

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
          <div className="ml-2 md:ml-4">
            <input
              className="block border rounded p-4 shadow-sm w-full md:w-1/2 bg-gray-50"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && image.size > 4000000 && (
              <div className="text-red-600 text-sm p-4">
                Images must be smaller than 4MB
              </div>
            )}
            {image && !imageFormat && (
              <div className="text-red-600 text-sm p-4">
                Wrong file type - Supported file types: .jpg, .jpeg, .png, .gif,
                .svg, .webp
              </div>
            )}

            {medicines && documentFocus === 1 && (
              <select
                onChange={handleChange}
                className="select select-bordered select-accent w-full md:w-1/2 my-4"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled="disabled">
                  Select Medicine
                </option>
                {medicines.map((document) => {
                  return (
                    <option value={document.id} key={document.id}>
                      {document.document_name}
                    </option>
                  );
                })}
              </select>
            )}
            {procedures && documentFocus === 2 && (
              <select
                onChange={handleChange}
                className="select select-bordered select-accent w-full md:w-1/2 my-4"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled="disabled">
                  Select Procedure
                </option>
                {procedures.map((document) => {
                  return (
                    <option value={document.id} key={document.id}>
                      {document.document_name}
                    </option>
                  );
                })}
              </select>
            )}
            {protocols && documentFocus === 3 && (
              <select
                onChange={handleChange}
                className="select select-bordered select-accent w-full md:w-1/2 my-4"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled="disabled">
                  Select Protocol
                </option>
                {protocols.map((document) => {
                  return (
                    <option value={document.id} key={document.id}>
                      {document.document_name}
                    </option>
                  );
                })}
              </select>
            )}

            {image && document && image.size < 4000000 && imageFormat ? (
              <button
                className="btn btn-info w-full md:w-1/2 block"
                onClick={() => newImage()}
              >
                Add Image
              </button>
            ) : (
              <button className="btn btn-disabled w-full md:w-1/2 block">
                Add Image
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
