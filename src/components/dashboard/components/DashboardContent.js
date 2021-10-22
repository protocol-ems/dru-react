import React from "react";

import ViewDocuments from "src/components/dashboard/components/documents/ViewDocuments";
import GetImages from "src/components/dashboard/components/documents/GetImages.js";
export default function DashboardContent({
  companyDocuments,
  setCompanyDocuments,
  offline,
  companyImages,
  loading,
}) {
  return (
    <div className="flex flex-col w-full">
      <ViewDocuments
        companyDocuments={companyDocuments}
        setCompanyDocuments={setCompanyDocuments}
        offline={offline}
        companyImages={companyImages}
        loading={loading}
      />
      {!offline && <GetImages />}
    </div>
  );
}
