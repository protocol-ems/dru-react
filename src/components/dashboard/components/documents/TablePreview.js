import React from "react";

export default function TablePreview({ tableData }) {
  return (
    <div className="pb-12">
      <div>
        {tableData.table_description.length && tableData.columns.length > 0 ? (
          <div>
            <p className="whitespace-pre-line text-left  mt-4 text-2xl">
              {tableData.table_description}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {tableData.columns.length > 0 ? (
        <div className="overflow-auto">
          <table className="border-collapse w-full table-fixed break-word mt-12">
            <thead>
              <tr className="h-12">
                {tableData.columns.map((column) => {
                  return (
                    <th
                      className=" p-1 sm:p-2 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  lg:table-cell w-52"
                      key={column.id}
                    >
                      {column.value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, i) => {
                return (
                  <tr className="border even:bg-green-50" key={i} id={i}>
                    {row.map((el) => {
                      return (
                        <td className="border " key={el.id}>
                          <p className="min-h-12 min-w-12 break-all p-1 sm:p-2">
                            {el.value}
                          </p>
                        </td>
                      );
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
