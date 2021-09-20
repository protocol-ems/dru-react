import React from "react";

import CreateFlow from "src/components/dashboard/components/documents/flow/CreateFlow";


export default function CreateFlowSection({
  flowData,
  setFlowData,
  initialFlowData,
}) {
  return (
    <div>
      <CreateFlow
        flowData={flowData}
        setFlowData={setFlowData}
        initialFlowData={initialFlowData}
      />
    </div>
  );
}
