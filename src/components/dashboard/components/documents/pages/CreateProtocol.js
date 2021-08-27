import React, { useState, useContext, useEffect } from "react";
import CreateDocument from "../CreateDocument";
import UserContext from "../../../../context/UserContext";
import { axiosInstance } from "../../../../../axios";
export default function CreateProtocol({
  details,
  tableDetails,
  flowDetails,
  editMode,
  editId,
  setEdit,
}) {
  const { userData } = useContext(UserContext);

  const initalLabels = Object.freeze({
    labels: undefined,
  });
  const [labels, setLabels] = useState(initalLabels);

  useEffect(() => {
    const getProtocolLabels = async () => {
      await axiosInstance
        .get(`company-document-headers/${userData.user.company}/`)
        .then((res) => {
          const protocolLabels = res.data.filter((label) => {
            return label.document_type === 3;
          });
          setLabels(protocolLabels);
        });
    };
    if (userData.user !== null) {
      getProtocolLabels();
    }
  }, [userData.user]);

  return (
    <div>
      {labels.length > 0 ? (
        <CreateDocument
          labels={labels}
          documentType="3"
          details={details}
          tableDetails={tableDetails}
          flowDetails={flowDetails}
          editMode={editMode}
          editId={editId}
          setEdit={setEdit}
        />
      ) : (
        <div className=" mx-auto text-center pt-24">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
