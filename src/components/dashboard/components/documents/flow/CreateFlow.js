import React, { useState, useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  ReactFlowProvider,
  removeElements,
  addEdge,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

import NodeEditor from "./NodeEditor";

import CustomEdge from "./CustomEdge";

export default function CreateFlow({ flowData, setFlowData }) {
  const edgeTypes = {
    custom: CustomEdge,
  };

  const [elements, setElements] = useState(flowData.flow_data);
  const [elementLabel, setElementLabel] = useState("");
  const [editNode, setEditNode] = useState({});
  const [animated, setAnimated] = useState(false);
  const [bottom, setBottom] = useState(100);
  const [chart, setChart] = useState(false);

  const reactFlowWrapper = useRef(null);

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const getNodeId = () => uuidv4();

  const onAdd = () => {
    const newNode = {
      id: getNodeId(),
      data: { label: "" },
      type: "default",
      position: {
        x: 50,
        y: bottom,
      },
      style: {
        width: 150,
        background: "white",
        border: "1px solid black",
        whiteSpace: "pre-wrap",
        color: "black",
      },
    };
    setElements((els) => els.concat(newNode));
  };
  const onElementClick = (e) => {
    if (e.target.dataset.id) {
      const editElementInfo = elements.filter(
        (el) => el.id === e.target.dataset.id
      );
      setEditNode(editElementInfo[0]);
      setElementLabel(editElementInfo[0].data.label);
    }
    if (e.target.id) {
      const editEdgeInfo = elements.filter((el) => el.id === e.target.id);
      setEditNode(editEdgeInfo[0]);
      setElementLabel(editEdgeInfo[0].data.label);
    }
  };

  const confirmEdit = (id) => {
    if (editNode.position) {
      const editedElementList = elements.map((el) => {
        if (el.id === id) {
          const editedNode = {
            ...editNode,
            data: { label: elementLabel },
            position: {
              x: editNode.position.x,
              y: editNode.position.y,
            },
          };
          setBottom(editedNode.position.y);
          setEditNode(editedNode);
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
    }
    if (!editNode.position) {
      const editedElementList = elements.map((el) => {
        if (el.id === id) {
          const editedNode = {
            id: editNode.id,
            type: editNode.type,
            animated: animated,
            data: { label: elementLabel },
            source: editNode.source,
            target: editNode.target,
          };
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
      setAnimated(false);
    }
  };

  const onDrag = (e) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: (e.clientX - reactFlowBounds.left).toFixed(0),
      y: (e.clientY - reactFlowBounds.top).toFixed(0),
    });

    const editElementInfo = elements.filter(
      (el) => el.id === e.target.dataset.id
    );

    if (editElementInfo.length !== 0) {
      editElementInfo[0].position = position;
      setBottom(editElementInfo[0].position.y);
      setEditNode(editElementInfo[0]);
      setElementLabel(editElementInfo[0].data.label);
    }
  };

  const editNewEdge = (id) => {
    const editedElementList = elements.map((el) => {
      if (el.id === id) {
        const editedNode = {
          id: id,
          type: "custom",
          data: { label: "No Text Set" },
          source: el.source,
          target: el.target,
        };
        return editedNode;
      }
      return el;
    });
    setElements(editedElementList);
  };

  const handleAnimate = () => {
    setAnimated(!animated);
  };

  useEffect(() => {
    setFlowData({
      flow_data: elements,
    });
  }, [elements, setFlowData]);

  return (
    <>
      <div className="font-bold text-3xl py-8 text-center">
        Create Flow Chart Section
      </div>
      {chart ? (
        <div className="border rounded py-4 px-2">
          <ReactFlowProvider>
            <div
              style={{ height: 500 }}
              className="reactflow-wrapper wordbreaker"
              ref={reactFlowWrapper}
            >
              <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onElementClick={onElementClick}
                edgeTypes={edgeTypes}
                onNodeDragStop={onDrag}
                onLoad={onLoad}
              >
                <Background variant="dots" gap={10} size={0.5} />
                <Controls />
                <MiniMap
                  nodeColor={(node) => {
                    switch (node.type) {
                      case "input":
                        return "red";
                      case "default":
                        return "#00ff00";
                      case "output":
                        return "rgb(0,0,255)";
                      default:
                        return "#eee";
                    }
                  }}
                  nodeStrokeWidth={3}
                />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
          {/* <button className="btn" onClick={logData}>
        Log daata
      </button> */}
          <button
            className="btn btn-accent w-full max-w-xs mx-auto"
            onClick={onAdd}
          >
            add node
          </button>
          <div className="w-full  flex flex-col sm:flex-row justify-between h-full my-4 bg-gray-50 p-4 rounded border">
            <div className="w-full  ">
              <NodeEditor
                editNode={editNode}
                setEditNode={setEditNode}
                setElements={setElements}
                elements={elements}
              />
              <div>
                {editNode.source && (
                  <div className="p-6 card bordered">
                    {" "}
                    <div className="form-control flex flex-row text-center justify-center items-center">
                      <label className="cursor-pointer label">
                        <span className="label"> Animate the edge?</span>
                      </label>
                      <input
                        type="checkbox"
                        id="animate"
                        name="animate"
                        checked={animated}
                        onChange={handleAnimate}
                        className="checkbox checkbox-accent"
                      ></input>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full ">
              {" "}
              <label className="label text-2xl bold uppercase text-center">
                Text:
              </label>
              <textarea
                className=" border outline-none rounded-xl p-4 w-full h-72"
                value={elementLabel}
                onChange={(evt) => setElementLabel(evt.target.value)}
              />
              <button
                className="btn btn-accent"
                onClick={() => confirmEdit(editNode.id)}
              >
                accept
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn btn-warning"
              onClick={() => {
                setChart(false);
              }}
            >
              Remove The Flow Chart
            </button>
            <button
              className="btn btn-warning"
              onClick={() => {
                console.log(JSON.stringify(flowData));
              }}
            >
              Log JSON String
            </button>
          </div>
          <div>
            {elements.map((el) => {
              return (
                <div key={el.id}>
                  <div>
                    <div>
                      {el.sourceHandle === null ? (
                        <div onClick={editNewEdge(el.id, el)}>
                          Add text to node
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button className="btn btn-success " onClick={() => setChart(true)}>
            Add a flow chart
          </button>
        </div>
      )}
    </>
  );
}
