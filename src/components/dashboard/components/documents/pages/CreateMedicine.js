import React, { useState, useContext, useEffect } from "react";
import CreateDocument from "../CreateDocument";
import UserContext from "../../../../context/UserContext";
import { axiosInstance } from "../../../../../axios";

export default function CreateMedicine() {
  const { userData } = useContext(UserContext);

  const initalLabels = Object.freeze({
    labels: undefined,
  });
  const [labels, setLabels] = useState(initalLabels);

  useEffect(() => {
    const getMedicineLabels = async () => {
      await axiosInstance
        .get(`company-document-headers/${userData.user.company}/`)
        .then((res) => {
          const medicineLabels = res.data.filter((label) => {
            return label.document_type === 1;
          });
          setLabels(medicineLabels);
        });
    };
    if (userData.user !== null) {
      getMedicineLabels();
    }
  }, [userData.user]);

  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          console.log(labels);
        }}
      >
        Click
      </button>
      {labels.length > 0 ? (
        <CreateDocument labels={labels} />
      ) : (
        "Please create labels to move forward"
      )}
    </div>
  );
}
