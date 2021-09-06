import React, { useState, useContext } from "react";

import UserContext from "../../../context/UserContext";

export default function ImageCenter({ companyDocuments }) {
  const { userData } = useContext(UserContext);

  const [image, setImage] = useState();
  const [document, setDocument] = useState();

  const newImage = () => {
    const uploadData = new FormData();

    uploadData.append("image", image);
    uploadData.append("document", document);
    uploadData.append("company", userData.user.company);

    fetch("http://127.0.0.1:8000/images/", {
      method: "POST",
      body: uploadData,
    }).then((res) => console.log(res));
  };

  const handleChange = (e) => {
    setDocument(e.target.value);
  };

  return (
    <div>
      {companyDocuments.length > 0 && (
        <div>
          <label className="label">Image</label>

          <input
            className="block"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label className="label">Document</label>
          <select
            onChange={handleChange}
            className="select select-bordered select-accent w-full"
          >
            {companyDocuments.map((document) => {
              return (
                <option value={document.id} key={document.id}>
                  {document.document_name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-accent my-4" onClick={() => newImage()}>
            Add Image
          </button>
        </div>
      )}
    </div>
  );
}
