import React, { useState } from "react";

export default function CreateTableSection() {
  const initialTableData = Object.freeze({
    columns: [],
    rows: [],
  });

  //   rows: [
  //       rowNumber: Number,
  //       rowValues: [{
  //           columnPosition: value,
  //           Header: value,
  //       }, {
  //         columnPosition: value,
  //         Header: value,
  //       }]
  //   ]
  const [rows, setRows] = useState(0);
  const [columns, setCoulmns] = useState(0);
  const [tableData, setTableData] = useState(initialTableData);

  const handleRow = (e) => {
    setRows(e.target.value);
    // if (adjust === 1) {
    //   setRows(rows + 1);
    //   addTableRow();
    // }
    // if (adjust === -1 && rows > 0) {
    //   setRows(rows - 1);
    // }
    // console.log(tableData);
  };

  const handleColumn = (e) => {
    setCoulmns(e.target.value);
    // if (adjust === 1) {
    //   setCoulmns(columns + 1);
    //   addTableColumn();
    // }
    // if (adjust === -1 && columns > 0) {
    //   setCoulmns(columns - 1);
    //   removeTableColumn();
    // }
    // console.log(tableData);
  };

  const createTableColumns = () => {
    let columnsData = [];

    for (let i = 0; i < columns; i++) {
      columnsData.push({ id: i, value: "" });
    }
    return columnsData;
    // setTableData({ ...tableData, columns: columnsData });
  };

  const createTableRow = () => {
    let rowData = [];

    for (let i = 0; i < columns; i++) {
      rowData.push({ id: i, value: "" });
    }
    return rowData;
  };

  const createTableRows = () => {
    let rowsData = [];

    for (let i = 0; i < rows; i++) {
      rowsData.push(createTableRow());
    }
    return rowsData;
    // setTableData({ ...tableData, rows: rowsData });
  };

  const createTable = () => {
    setTableData({
      ...tableData,
      columns: createTableColumns(),
      rows: createTableRows(),
    });
  };

  const addTableColumn = () => {
    let tableDataColumns = tableData.columns;

    let newColumn = {
      id: tableDataColumns.length,
      header: "",
    };

    tableDataColumns.push(newColumn);
    setTableData({
      ...tableData,
      columns: tableDataColumns,
    });
  };

  const addTableRow = () => {
    let tableDataRows = tableData.rows;
    console.log(tableData.columns.length);
    console.log(rows);

    for (let i = 0; i < rows; i++) {
      tableDataRows[i] = { ...tableData.rows, header: "12" };
    }

    // let mappedColumns = () => {
    //   console.log(tableData);
    //   return tableData.columns.map((column) => {
    //     return {
    //       rowValues: [
    //         {
    //           columnPosition: 1,
    //           data: "1",
    //         },
    //       ],
    //     };
    //   });
    // };
    // let newRow = {
    //   rowValues: [
    //     {
    //       columnPosition: 1,
    //       data: "test",
    //     },
    //   ],
    // };
    // tableDataRows.push(mappedColumns());
    // setTableData({ ...tableData, rows: tableDataRows });
  };

  const removeTableColumn = () => {
    let tableDataColumns = tableData.columns;
    tableDataColumns.pop();
    setTableData({ ...tableData, columns: tableDataColumns });
  };

  const handleColumnChange = (e) => {
    let tableDataColumns = tableData.columns;
    tableDataColumns[e.target.id].value = e.target.value;
  };

  const handleRowChange = (e) => {
    console.log(e.target);
  };

  return (
    <div className="container mx-auto text-center">
      <div>Create Table Section</div>
      <div>Preview Goes up top with other preview</div>
      <div>
        Table Description textarea would be good here. For general info about
        the table. Maybe put one at the footer as well. Not sure.
      </div>
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
                  <tr key={i}>
                    {row.map((el) => {
                      return (
                        <td key={el.id}>
                          <input
                            type="text"
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
          <button
            className="btn"
            onClick={() => {
              handleColumn(1);
            }}
          >
            add column
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              handleColumn(-1);
            }}
          >
            remove column
          </button>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              handleRow(1);
            }}
          >
            add row
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              handleRow(-1);
            }}
          >
            remove row
          </button>
        </div>
      </div>
    </div>
  );
}
