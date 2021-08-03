import React, { useState, useContext } from "react";
import { axiosInstance } from "../../../../axios";
import UserContext from "../../../context/UserContext";
import Error from "../../../misc/Error";

export default function LabelList({ labels, setLabels }) {
  //Could not get word-break to work in this section. Long labels look really bad.
  // Will come back in the  future 8/3

  const { userData } = useContext(UserContext);

  const initialPosition = Object.freeze({
    position: undefined,
    company: undefined,
  });

  const initialLabel = Object.freeze({
    labelId: undefined,
    document_detail_name: undefined,
    company: undefined,
  });

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [position, setPosition] = useState(initialPosition);
  const [newLabel, setNewLabel] = useState(initialLabel);

  const handlePositionChange = (e) => {
    e.preventDefault();
    setPosition({
      ...position,
      [e.target.name]: e.target.value,
      labelId: e.target.id,
    });
    console.log(position);
  };

  const handleLabelChange = (e) => {
    e.preventDefault();
    setNewLabel({
      ...newLabel,
      labelId: e.target.id,
      [e.target.name]: e.target.value,
    });
    console.log(newLabel);
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

  return (
    <div>
      {errorMessage && (
        <Error
          errorMessage={errorMessage}
          clearError={() => setErrorMessage(undefined)}
        />
      )}
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Order</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {labels ? (
              labels.map((label) => {
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
                      <div className="flex justify-start">
                        <input
                          type="text"
                          placeholder={label.document_detail_name}
                          name="document_detail_name"
                          onChange={handleLabelChange}
                          id={label.id}
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
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
