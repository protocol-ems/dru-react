import React from "react";

export default function DocumentDisplay({ documentDetails, labels }) {
  const filteredArray = (label) => {
    let filteredArr = documentDetails.documentDetails.filter(
      (document) => document.label === label.document_detail_name
    );
    let arr = [];
    filteredArr.map((value) => {
      arr.push(value.value);
    });

    return arr;
  };
  return (
    <div>
      <button onClick={console.log(documentDetails)}>log doc</button>
      <div>
        <div className="max-w-screen-xl mx-auto p-8 mb-24 text-left">
          {documentDetails.document_name ? (
            <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 uppercase">
              {documentDetails.document_name}
            </h2>
          ) : (
            ""
          )}
          <ul className="flex items-start gap-8 flex-wrap">
            <li className="w-2/5">
              {labels
                ? labels.map((label) => {
                    return (
                      <div>
                        <div className="text-lg font-medium leading-6 text-green-400">
                          {label.document_detail_name}
                        </div>
                        <ul className="mt-2 list-disc">
                          {filteredArray(label).map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ul>
                      </div>
                    );
                  })
                : ""}

              <div className="mt-2">
                <div className="text-base leading-6 text-gray-600">
                  Label Name Single Result
                </div>
              </div>
            </li>
            <li className="md:w-2/5">
              <div className="text-lg font-medium leading-6 text-green-400">
                Label Name
              </div>
              <ul className="mt-2 list-disc">
                {/* {result.actionList.map((action) => {
                    return (
                      <li
                        key={action.id}
                        className="text-base leading-6 text-gray-600 m-4"
                      >
                        {action.name}
                      </li>
                    );
                  })} */}{" "}
                Map here for label with multiple results
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
