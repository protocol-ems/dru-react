import React, { useState } from "react";


export default function DocumentPreview({
  documentDetails,
  setDocumentDetails,
  labels,
}) {
  const [edit, setEdit] = useState(false);
  const [editDetail, setEditDetail] = useState({});

  const filteredDetailsByLabel = (label) => {
    let filteredArr = documentDetails.documentDetails.filter(
      (document) => document.label === label.document_detail_name
    );
    let arr = [];
    filteredArr.map((value) => {
      if (value.id) {
        return arr.push({
          value: value.value,
          id: value.id,
          label: label.document_detail_name,
        });
      } else return arr;
    });
    return arr;
  };

  const handleEdit = (detail) => {
    setEdit(true);
    window.scrollTo(0, 0);

    setEditDetail(detail);
  };

  const editChangeHandler = (e) => {
    setEditDetail({ ...editDetail, value: e.target.value });
  };

  const confirmEditHandler = (id) => {
    const editedDocumentList = documentDetails.documentDetails.map((detail) => {
      if (detail.id === id) {
        const updatedDocument = {
          ...detail,
          value: editDetail.value,
        };
        return updatedDocument;
      }
      return detail;
    });
    setDocumentDetails({
      ...documentDetails,
      documentDetails: editedDocumentList,
    });
    setEdit(false);
  };

  const confirmRemoveHandler = (id) => {
    //code goes here
    const newDocumentList = documentDetails.documentDetails.filter(
      (detail) => detail.id !== id
    );
    setDocumentDetails({
      ...documentDetails,
      documentDetails: newDocumentList,
    });
    setEdit(false);
  };

  return (
    <div>
      <div className="relative">
        <div className="w-1/2 mt-12 mx-auto ">
          {edit ? (
            <div className=" w-full mx-auto bg-gray-200 py-4 px-4 rounded z-20 ">
              <h2 className="text-lg text-center">Edit Menu</h2>
              <textarea
                className="border outline-none rounded-xl p-4 w-full"
                cols="20"
                rows="10"
                value={editDetail.value}
                onChange={editChangeHandler}
              ></textarea>
              <button
                onClick={() => {
                  confirmEditHandler(editDetail.id);
                }}
                className="btn btn-accent my-4  justify-center w-full"
              >
                Confirm Edit
              </button>
              <button
                onClick={() => confirmRemoveHandler(editDetail.id)}
                className="btn btn-warning my-4  justify-center w-full"
              >
                Remove
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  window.scrollTo(0, 0);
                }}
                className="btn bg-grey-300 my-4  justify-center w-full "
              >
                Close
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="max-w-screen-xl mx-auto p-8 mb-24 text-left">
          {documentDetails.document_name ? (
            <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 uppercase">
              {documentDetails.document_name}
            </h2>
          ) : (
            <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-150 text-gray-200 mb-12 uppercase">
              Please enter a name
            </h2>
          )}
          <ul className="flex items-start gap-8 flex-wrap">
            {labels
              ? labels.map((label) => {
                  return (
                    <li className="w-2/5" key={label.id}>
                      <div className="text-lg font-medium leading-6 text-accent">
                        {label.document_detail_name}
                      </div>
                      <ul className="mt-2 list-disc">
                        {filteredDetailsByLabel(label).map((item) => {
                          return (
                            <li
                              key={item.id}
                              id={item.id}
                              className="hover:underline cursor-pointer whitespace-pre-line text-base leading-6 text-gray-600 m-4"
                              onClick={() => {
                                handleEdit(item);
                              }}
                            >
                              {item.value}
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
      </div>
    </div>
  );
}
