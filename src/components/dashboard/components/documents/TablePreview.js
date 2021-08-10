import React from "react";

export default function TablePreview({ tableData }) {
  return (
    <div>
      {tableData.columns.length > 1 ? (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                {tableData.columns.map((column) => {
                  return <th key={column.id}>{column.value}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, i) => {
                return (
                  <tr key={i} id={i}>
                    {row.map((el) => {
                      return <td key={el.id}>{el.value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
