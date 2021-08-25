import React from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";

export default function FlowView({ elements }) {
  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div style={{ height: 500 }} className="border rounded border-green-200">
      <ReactFlowProvider>
        <ReactFlow elements={elements} onLoad={onLoad} nodesDraggable={false}>
          <Background variant="dots" gap={10} size={0.5} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
