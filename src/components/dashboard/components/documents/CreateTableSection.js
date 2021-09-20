import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TablePreview from "src/components/dashboard/components/documents/TablePreview";


export default function CreateTableSection({
  tableData,
  setTableData,
  initialTableData,
}) {
  const initialTableState = () => {
    if (tableData.columns.length > 0) {
      return true;
    }
    return false;
  };

  const [rows, setRows] = useState(0);
  const [columns, setCoulmns] = useState(0);
  const [table, setTable] = useState(initialTableState());

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

  const removeTable = () => {
    setTable(false);
    setRows(0);
    setCoulmns(0);
    setTableData(initialTableData);
  };

  const handleTableDescription = (e) => {
    setTableData({ ...tableData, table_description: e.target.value });
  };

  return (
    <div className="container mx-auto text-center pt-16">
      <div className="font-bold text-3xl py-8">Create Table Section</div>
      {table ? (
        <div>
          <div>
            <div className="form-control sm:w-1/4 mx-auto">
              <label className="label"> How many Columns</label>
              <input
                className="input input-accent"
                type="number"
                name="position"
                onChange={handleColumn}
                min="1"
                max="25"
              ></input>
              <label className="label">How many Rows?</label>
              <input
                className="input input-accent"
                type="number"
                name="position"
                onChange={handleRow}
                min="1"
                max="25"
              ></input>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label text-3xl">Table Description</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                placeholder="Table Description..."
                onChange={handleTableDescription}
                value={tableData.table_description}
              ></textarea>
            </div>
            <div className="flex justify-around my-4">
              <button
                className="btn"
                onClick={() => {
                  createTable();
                }}
              >
                Generate Table Table
              </button>
              <div className="flex">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    removeTable();
                  }}
                >
                  Remove Table
                </button>
              </div>
            </div>
            <TablePreview tableData={tableData} />
            {tableData.columns.length > 0 && (
              <div className="text-3xl font-bold pt-12 text-left">
                Enter Data Below
              </div>
            )}

            <div className="overflow-auto">
              <table className="border-collapse w-full table-fixed break-word mt-4 ">
                <thead>
                  <tr>
                    {tableData.columns.length > 0 ? (
                      tableData.columns.map((column, index) => {
                        return (
                          <th
                            key={column.id}
                            className=" min-h-12 min-w-12 p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52"
                          >
                            <input
                              id={column.id}
                              type="text"
                              className="input input-ghosted input-sm w-full rounded-none "
                              onChange={handleColumnChange}
                              value={tableData.columns[index].value}
                            ></input>
                          </th>
                        );
                      })
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.length > 0 ? (
                    tableData.rows.map((row, i) => {
                      return (
                        <tr
                          className="border even:bg-green-50  "
                          key={i}
                          id={i}
                        >
                          {row.map((el, index) => {
                            return (
                              <td className="border" key={el.id}>
                                <input
                                  type="text"
                                  position={el.position}
                                  id={el.id}
                                  className="input input-ghosted input-sm w-full rounded-none "
                                  onChange={handleRowChange}
                                  value={tableData.rows[i][index].value}
                                ></input>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button className="btn btn-success" onClick={() => setTable(true)}>
            Add a table
          </button>
        </div>
      )}
    </div>
  );
}
