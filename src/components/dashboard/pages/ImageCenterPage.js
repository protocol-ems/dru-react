import React, { useState, useEffect, useContext } from "react";
import UserContext from "src/components/context/UserContext";
import ImageCenter from "src/components/dashboard/components/documents/ImageCenter";
import SubscribeToday from "src/components/dashboard/components/payments/SubscribeToday";
import { axiosInstance } from "src/axiosInstance";

export default function ImageCenterPage() {
  const [companyInfo, setCompanyInfo] = useState();
  const [companyDocuments, setCompanyDocuments] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");

    const getCompanyInfo = async () => {
      if (token !== "" && userData.user.company) {
        let companyId = userData.user.company;
        await axiosInstance
          .get(`company/${companyId}/`)
          .then((res) => setCompanyInfo(res.data));
      }
    };

    const getCompanyDocuments = async () => {
      if (token !== "") {
        let companyId = userData.user.company || 1;
        await axiosInstance
          .get(`company-documents/${companyId}/`)
          .then((res) => {
            setCompanyDocuments(res.data);
          });
      }
    };
    getCompanyInfo();
    getCompanyDocuments();
  }, [userData]);

  return (
    <div className="container mx-auto">
      <div>Image Center Info Here</div>
      <div className="bg-white  rounded-3xl mb-4 p-4 ">
        <div className="text-center text-4xl py-4">Image Center</div>
        {companyInfo && companyInfo.is_active && (
          <ImageCenter companyDocuments={companyDocuments} />
        )}
        {companyInfo && !companyInfo.is_active && <SubscribeToday />}
      </div>
    </div>
  );
}
