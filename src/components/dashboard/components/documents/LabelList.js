import React, { useState, useContext, useEffect } from "react";

import { axiosInstance } from "src/axiosInstance";
import UserContext from "src/components/context/UserContext";
import Error from "src/components/misc/Error";

export default function LabelList({ labels, setLabels }) {
  //Could not get word-break to work in this section. Long labels look really bad.
  // Will come back in the  future 8/3

  const { userData } = useContext(UserContext);

  const initialPosition = Object.freeze({
    position: null,
    company: userData.user.company,
  });

  const initialLabel = Object.freeze({
    labelId: null,
    document_detail_name: null,
    company: userData.user.company,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [position, setPosition] = useState(initialPosition);
  const [newLabel, setNewLabel] = useState(initialLabel);
  const [labelCopy, setLabelCopy] = useState(labels);

  const handlePositionChange = (e) => {
    e.preventDefault();
    // set position is a state we use in the post request. It stores the info that goes in the post request.
    setPosition({
      ...position,
      [e.target.name]: e.target.value,
      labelId: e.target.id,
    });

    // this updates our copy of the labels.
    let updatedLabel = labelCopy.map((label) => {
      if (label.id === parseInt(e.target.id)) {
        return { ...label, position: e.target.value };
      }
      return label;
    });
    setLabelCopy(updatedLabel);
  };

  const handleLabelChange = (e) => {
    e.preventDefault();
    setNewLabel({
      ...newLabel,
      labelId: e.target.id,
      [e.target.name]: e.target.value,
    });

    let updatedLabel = labelCopy.map((label) => {
      if (label.id === parseInt(e.target.id)) {
        return { ...label, document_detail_name: e.target.value };
      }
      return label;
    });
    setLabelCopy(updatedLabel);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();

    if (type === "position") {
      axiosInstance
        .patch(`/document-headers/${position.labelId}/`, {
          position: position.position,
        })
        .then(() => {
          axiosInstance
            .get(`/company-document-headers/${userData.user.company}/`)
            .then((res) => {
              setLabels(res.data);
              setPosition(initialPosition);
            });
        });
      e.target.parentElement.firstChild.value = "";
    }

    if (type === "label") {
      axiosInstance
        .patch(`/document-headers/${newLabel.labelId}/`, {
          document_detail_name: newLabel.document_detail_name,
        })
        .catch((err) => {
          err
            ? setErrorMessage("The label cannot be blank")
            : setErrorMessage(undefined);
        })
        .then(() => {
          axiosInstance
            .get(`/company-document-headers/${userData.user.company}/`)
            .then((res) => {
              setLabels(res.data);
              setNewLabel(initialLabel);
            });
        });
      e.target.parentElement.firstChild.value = "";
    }
  };

  const confirmDelete = (e) => {
    let result = window.confirm("Are you sure you want to delete?");
    if (result) {
      axiosInstance.delete(`/document-headers/${e.target.id}/`).then(() => {
        axiosInstance
          .get(`/company-document-headers/${userData.user.company}/`)
          .then((res) => {
            setLabels(res.data);
          });
      });
    }
  };

  useEffect(() => {
    // refreshed the copy of the labels we use after any post request is made to the actual data.
    setLabelCopy(labels);
  }, [labels, setLabels]);

  return (
    <div>
      {errorMessage && (
        <Error
          errorMessage={errorMessage}
          clearError={() => setErrorMessage(undefined)}
        />
      )}
      <div className="overflow-x-auto scrollbar-thumb-rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Position</th>
              <th>Label</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {labelCopy ? (
              labelCopy.map((label) => {
                return (
                  <tr key={label.id}>
                    <td>
                      <div className="flex justify-start">
                        <input
                          type="number"
                          placeholder={label.position}
                          className="w-12"
                          name="position"
                          onChange={handlePositionChange}
                          value={label.position}
                          id={label.id}
                          min="0"
                        ></input>
                        {label.id === parseInt(position.labelId) ? (
                          <button
                            className="btn btn-xs btn-accent"
                            onClick={(e) => handleSubmit(e, "position")}
                          >
                            update
                          </button>
                        ) : (
                          <button className="btn btn-xs btn-disabled">
                            update
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="break-all">
                      <div className="flex justify-between">
                        <input
                          type="text"
                          placeholder={label.document_detail_name}
                          name="document_detail_name"
                          onChange={handleLabelChange}
                          id={label.id}
                          className="w-1/2"
                          value={label.document_detail_name}
                        />
                        {label.id === parseInt(newLabel.labelId) ? (
                          <button
                            className="btn btn-xs btn-accent"
                            onClick={(e) => handleSubmit(e, "label")}
                          >
                            update
                          </button>
                        ) : (
                          <button className="btn btn-xs btn-disabled">
                            update
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        id={label.id}
                        onClick={(e) => confirmDelete(e)}
                        className="btn btn-xs btn-warning"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <div className="loader">Loading</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
