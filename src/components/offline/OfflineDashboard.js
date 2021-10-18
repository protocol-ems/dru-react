import React, { useEffect, useState } from "react";

import DashboardContent from "src/components/dashboard/components/DashboardContent";
import OfflineBanner from "src/components/offline/OfflineBanner";

export default function OfflineDashboard() {
  const [companyDocuments, setCompanyDocuments] = useState([]);
  const [timeout, setTimeout] = useState();
  const [allowAccess, setAllowAccess] = useState(false);

  useEffect(() => {
    let isUnmount = false;

    let currentDate = new Date().getTime();

    const getTimeout = () => {
      let offlineTimeout = localStorage.getItem("Timeout");
      setTimeout(parseInt(offlineTimeout) || 0);
    };

    if (currentDate <= timeout) {
      setAllowAccess(true);
    } else {
      setAllowAccess(false);
    }

    const getCompanyDocuments = async () => {
      let offlineDocuments = localStorage.getItem("documents");

      if (!isUnmount) {
        setCompanyDocuments(JSON.parse(offlineDocuments));
      }
    };

    getTimeout();
    getCompanyDocuments();

    return () => {
      isUnmount = true;
    };
  }, [timeout]);

  return (
    <div className="mx-auto container pt-12 min-h-screen">
      {allowAccess && <OfflineBanner timeout={timeout} />}
      {allowAccess && (
        <DashboardContent
          companyDocuments={companyDocuments}
          setCompanyDocuments={setCompanyDocuments}
          offline={true}
        />
      )}
      {!allowAccess && (
        <div className="container ">
          <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-warning border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
            <div className="text-2xl">
              Please login to your account to regain access to offline mode.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
