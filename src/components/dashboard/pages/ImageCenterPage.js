import React, { useState, useEffect, useContext } from "react";
import UserContext from "src/components/context/UserContext";
import ImageCenter from "src/components/dashboard/components/documents/ImageCenter";
import SubscribeToday from "src/components/dashboard/components/payments/SubscribeToday";
import { axiosInstance } from "src/axiosInstance";

export default function ImageCenterPage() {
  const [companyInfo, setCompanyInfo] = useState();
  const [companyDocuments, setCompanyDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    let unMount = false;

    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance.get(`company/${companyId}/`).then((res) => {
          if (!unMount) {
            setCompanyInfo(res.data);
          }
        });
      }
    };

    const getCompanyDocuments = async () => {
      if (token !== "") {
        let companyId = userData.user.company || 1;
        await axiosInstance
          .get(`company-documents/${companyId}/`)
          .then((res) => {
            if (!unMount) {
              setCompanyDocuments(res.data);
              setLoading(false);
            }
          });
      }
    };
    getCompanyInfo();
    getCompanyDocuments();

    return () => {
      unMount = true;
    };
  }, [userData]);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="bg-white  rounded-3xl">
        <div className="text-center text-4xl pb-4 font-extrabold">
          Image Center
        </div>
        {companyInfo && companyInfo.is_active && (
          <ImageCenter companyDocuments={companyDocuments} />
        )}
        {loading && <div className="mx-auto loader">Loading</div>}
        {companyInfo && !companyInfo.is_active && <SubscribeToday />}
      </div>
    </div>
  );
}
