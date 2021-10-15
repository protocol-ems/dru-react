import React from "react";

import ViewDocuments from "src/components/dashboard/components/documents/ViewDocuments";

export default function DashboardContent({
  companyDocuments,
  setCompanyDocuments,
  offline,
}) {
  return (
    <div className="flex flex-col w-full">
      <ViewDocuments
        companyDocuments={companyDocuments}
        setCompanyDocuments={setCompanyDocuments}
        offline={offline}
      />
    </div>
  );
}
