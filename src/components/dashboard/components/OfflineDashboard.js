import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardContent from "src/components/dashboard/components/DashboardContent";

export default function OfflineDashboard() {
  const [companyDocuments, setCompanyDocuments] = useState([]);

  useEffect(() => {
    let isUnmount = false;

    const getCompanyDocuments = async () => {
      let offlineDocuments = localStorage.getItem("documents");

      if (!isUnmount) {
        setCompanyDocuments(JSON.parse(offlineDocuments));
      }
    };
    getCompanyDocuments();

    // if (!isUnmount && userData && userData.user !== null) {
    //   getCompanyDocuments();
    // }

    return () => {
      isUnmount = true;
    };
  }, []);

  return (
    <div className="mx-auto container">
      <div>Offline mode here</div>
      <button
        className="btn"
        onClick={() => {
          console.log(companyDocuments);
        }}
      >
        See Docs
      </button>

      <DashboardContent
        companyDocuments={companyDocuments}
        setCompanyDocuments={setCompanyDocuments}
        offline={true}
      />
    </div>
  );
}
