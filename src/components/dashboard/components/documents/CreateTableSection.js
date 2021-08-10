import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TablePreview from "./TablePreview";

export default function CreateTableSection() {
  const initialTableData = Object.freeze({
    columns: [],
    rows: [],
  });

  const [rows, setRows] = useState(0);
  const [columns, setCoulmns] = useState(0);
  const [tableData, setTableData] = useState(initialTableData);

  const handleRow = (e) => {
    setRows(e.target.value);
  };

  const handleColumn = (e) => {
    setCoulmns(e.target.value);
  };

  const createTableColumns = () => {
    let columnsData = [];

    for (let i = 0; i < columns; i++) {
      columnsData.push({ id: i, value: "" });
    }
    return columnsData;
  };

  const createTableRow = () => {
    let rowData = [];

    for (let i = 0; i < columns; i++) {
      rowData.push({ id: uuidv4(), value: "", position: i });
    }
    return rowData;
  };

  const createTableRows = () => {
    let rowsData = [];

    for (let i = 0; i < rows; i++) {
      rowsData.push(createTableRow());
    }
    return rowsData;
  };

  const createTable = () => {
    setTableData({
      ...tableData,
      columns: createTableColumns(),
      rows: createTableRows(),
    });
  };

  // const addTableColumn = () => {
  //   let tableDataColumns = tableData.columns;

  //   let newColumn = {
  //     id: tableDataColumns.length,
  //     header: "",
  //   };

  //   tableDataColumns.push(newColumn);
  //   setTableData({
  //     ...tableData,
  //     columns: tableDataColumns,
  //   });
  // };

  // const addTableRow = () => {
  //   let tableDataRows = tableData.rows;
  //   console.log(tableData.columns.length);
  //   console.log(rows);

  //   for (let i = 0; i < rows; i++) {
  //     tableDataRows[i] = { ...tableData.rows, header: "12" };
  //   }
  // };

  // const removeTableColumn = () => {
  //   let tableDataColumns = tableData.columns;
  //   tableDataColumns.pop();
  //   setTableData({ ...tableData, columns: tableDataColumns });
  // };

  const handleColumnChange = (e) => {
    let tableDataColumns = tableData.columns;
    tableDataColumns[e.target.id].value = e.target.value;
    setTableData({
      ...tableData,
    });
  };

  const handleRowChange = (e) => {
    let columnPosition = e.target.attributes.position.value;
    let rowPosition = e.target.parentElement.parentElement.id;
    tableData.rows[rowPosition][columnPosition].value = e.target.value;
    setTableData({
      ...tableData,
    });
  };

  return (
    <div className="container mx-auto text-center">
      <div>Create Table Section</div>
      <TablePreview tableData={tableData} />

      {/* <div>
        Table Description textarea would be good here. For general info about
        the table. Maybe put one at the footer as well. Not sure.
      </div> */}
      <div>
        <div className="form-control">
          <label className="label "> How many Columns</label>
          <input
            className="input input-accent"
            type="number"
            name="position"
            onChange={handleColumn}
            min="0"
          ></input>
          <label className="label">How many Rows?</label>
          <input
            className="input input-accent"
            type="number"
            name="position"
            onChange={handleRow}
            min="0"
          ></input>
        </div>

        <table className="table w-full table-zebra table-compact">
          <thead>
            <tr>
              {tableData.columns.length > 0 ? (
                tableData.columns.map((column) => {
                  return (
                    <th key={column.id}>
                      <input
                        id={column.id}
                        type="text"
                        className="input input-accent input-sm w-5/6 "
                        onChange={handleColumnChange}
                      ></input>
                    </th>
                  );
                })
              ) : (
                <th>no</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.length > 0 ? (
              tableData.rows.map((row, i) => {
                return (
                  <tr key={i} id={i}>
                    {row.map((el) => {
                      return (
                        <td key={el.id}>
                          <input
                            type="text"
                            position={el.position}
                            id={el.id}
                            className="input input-accent input-sm w-5/6 "
                            onChange={handleRowChange}
                          ></input>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <button
          className="btn"
          onClick={() => {
            createTable();
          }}
        >
          Create Table
        </button>
        <div className="flex">
          <button
            className="btn"
            onClick={() => {
              console.log(tableData);
            }}
          >
            Log Data
          </button>
        </div>
      </div>
    </div>
  );
}
