import React, { useState, useContext, useEffect } from "react";

import CreateDocument from "src/components/dashboard/components/documents/CreateDocument";
import UserContext from "src/components/context/UserContext";
import { axiosInstance } from "src/axiosInstance";

export default function CreateProcedure({
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
    const getProcedureLabels = async () => {
      await axiosInstance
        .get(`company-document-headers/${userData.user.company}/`)
        .then((res) => {
          const procedureLabels = res.data.filter((label) => {
            return label.document_type === 2;
          });
          setLabels(procedureLabels);
        });
    };
    if (userData.user !== null) {
      getProcedureLabels();
    }
  }, [userData.user]);

  return (
    <div className="min-h-screen">
      {labels.length > 0 ? (
        <CreateDocument
          labels={labels}
          documentType="2"
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
