import React, { useState } from "react";
// import MyEditor from "./MyEditor";

export default function CreateDocument({ labels }) {
  const [documentDetails, setDocumentDetails] = useState([]);
  const [detail, setDetail] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setDetail({ [e.target.name]: e.target.value.trim() });
  };

  const addDetail = (e) => {
    e.preventDefault();
    const newDocumentDetails = documentDetails.concat({ detail });
    setDocumentDetails(newDocumentDetails);

    // const newDetail = {
    //   itemName: detail,
    // };

    // if (documentDetails && documentDetails[e.target.name]) {
    //   console.log(documentDetails[e.target.name]);
    //   const newDetailList = {
    //     ...documentDetails[e.target.name],
    //     newDetail,
    //   };

    //   setDocumentDetails({
    //     ...documentDetails,
    //     [e.target.name]: newDetailList,
    //     newDetail,
    //   });
    // }
    // setDocumentDetails({
    //   [e.target.name]: [newDetail],
    // });
  };

  return (
    <div className="container mx-auto">
      <button
        className="btn"
        onClick={() => {
          console.log(documentDetails);
        }}
      >
        Console Data
      </button>
      <div className="container mx-auto py-24">
        {labels
          ? labels.map((label) => {
              return (
                <div key={label.id} className="border">
                  <div>{label.document_detail_name}</div>
                  <textarea
                    className="border bg-green-50"
                    name={label.document_detail_name}
                    id={`textarea-${label.id}`}
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                  ></textarea>
                  <button name={label.document_detail_name} onClick={addDetail}>
                    Add
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
