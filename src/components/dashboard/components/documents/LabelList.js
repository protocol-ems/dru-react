import React from "react";

export default function LabelList({ labels }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {labels ? (
              labels.map((label) => {
                return (
                  <tr key={label.id}>
                    <th>{label.id}</th>
                    <td>{label.document_detail_name}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
