import React, { useState } from "react";
import { useEffect } from "react";

export default function ({ editNode, setEditNode, elements, setElements }) {
  const backgroundSelector = (e) => {
    let bgColor = e.target.value;

    if (editNode) {
      const editedElementList = elements.map((el) => {
        if (el.id === editNode.id) {
          const editedNode = {
            ...editNode,
            style: { ...editNode.style, background: bgColor },
          };
          setEditNode(editedNode);
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
    }
  };

  const textSelector = (e) => {
    let textColor = e.target.value;

    if (editNode) {
      const editedElementList = elements.map((el) => {
        if (el.id === editNode.id) {
          const editedNode = {
            ...editNode,
            style: { ...editNode.style, color: textColor },
          };
          setEditNode(editedNode);
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
    }
  };

  const widthSelector = (e) => {
    let width = parseInt(e.target.value);

    if (editNode) {
      const editedElementList = elements.map((el) => {
        if (el.id === editNode.id) {
          const editedNode = {
            ...editNode,
            style: { ...editNode.style, width: width },
          };
          setEditNode(editedNode);
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
    }
  };

  const borderSelector = (e) => {
    console.log(e.target.value);
    let border = e.target.value;

    if (editNode) {
      const editedElementList = elements.map((el) => {
        if (el.id === editNode.id) {
          const editedNode = {
            ...editNode,
            style: { ...editNode.style, border: border },
          };
          setEditNode(editedNode);
          return editedNode;
        }
        return el;
      });
      setElements(editedElementList);
    }
  };
  return (
    <div>
      {editNode.position && (
        <div>
          <div className="flex flex-col max-w-xs w-full  px-4 py-6">
            {/* <button onClick={() => console.log(editNode.style.width)}>
              Click to see current node
            </button> */}
            <label className="label">Background color:</label>
            <select
              onChange={backgroundSelector}
              value={editNode.style.background}
              className="select select-bordered select-accent w-full max-w-xs"
            >
              <option value="white">White</option>
              <option value="#ff9999">Red</option>
              <option value="#b0e1ff">Blue</option>
              <option value="#c0f7c0">Green</option>
              <option value="#fcffa4">Yellow</option>
              <option value="#f4f0ec">Grey</option>
            </select>
            <label className="label">Text Color:</label>
            <select
              onChange={textSelector}
              value={editNode.style.color}
              className="select select-bordered select-accent w-full max-w-xs"
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
            </select>
            <label className="label">Border Color:</label>
            <select
              onChange={borderSelector}
              value={editNode.style.border}
              className="select select-bordered select-accent w-full max-w-xs"
            >
              <option value="1px solid black">Black</option>
              <option value="1px solid white">White</option>
              <option value="1px solid red">Red</option>
              <option value="1px solid #b0e1ff">Blue</option>
              <option value="1px solid #c0f7c0">Green</option>
              <option value="1px solid #fcffa4">Yellow</option>
              <option value="1px solid #f4f0ec">Grey</option>
            </select>
            <label className="label">Width:</label>
            <select
              onChange={widthSelector}
              value={editNode.style.width}
              className="select select-bordered select-accent w-full max-w-xs"
            >
              <option value="150">Small</option>
              <option value="250">Medium</option>
              <option value="400">Large</option>
              <option value="600">Extra Large</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
