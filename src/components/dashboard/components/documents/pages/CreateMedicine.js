import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import CreateDocument from "src/components/dashboard/components/documents/CreateDocument";
import UserContext from "src/components/context/UserContext";
import { axiosInstance } from "src/axiosInstance";

function CreateMedicine({
  details,
  tableDetails,
  flowDetails,
  editMode,
  editId,
  setEdit,
  setDocuments,
}) {
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
    <div className="min-h-screen">
      {labels.length > 0 ? (
        <CreateDocument
          labels={labels}
          documentType="1"
          details={details}
          tableDetails={tableDetails}
          flowDetails={flowDetails}
          editMode={editMode}
          editId={editId}
          setEdit={setEdit}
          setDocuments={setDocuments}
        />
      ) : (
        <div className=" mx-auto text-center pt-24">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default withRouter(CreateMedicine);
