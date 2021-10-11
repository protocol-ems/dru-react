import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "src/components/context/UserContext";

export default function CreateNewPage() {
  const { userData } = useContext(UserContext);

  return (
    <div className="container mx-auto ">
      {userData.user && userData.user.employee_type === 4 && (
        <div>
          <div className="flex flex-col">
            <div className="border rounded p-4 md:p-12 flex flex-col my-4 shadow-md hover:bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold uppercase py-4">Labels</h2>
                <p className=" p-4 text-xl">
                  Labels are the subcategories for medicine, procedures, and
                  protocols. Create the exact definitions you want for your
                  team.
                </p>
                <p className="px-4 text-gray-600">
                  Examples of Medicine labels are Actions, Indications,
                  Contraindications, Pediatric, Key Points, or anything you may
                  want to call out.
                </p>
              </div>
              <Link
                to="/create-document-header"
                className=" btn btn-accent h-12 w-24 mt-4 mx-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                Create
              </Link>
            </div>
            <div className="border rounded p-4 md:p-12 flex flex-col my-4 shadow-md hover:bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold uppercase py-4">Medicine</h2>
                <p className=" p-4 text-xl">
                  Create a Medicine with the labels you made, add a table, and a
                  flow chart if needed. Pictures can be added after you create
                  the medicine.
                </p>
                <p className="px-4 text-gray-600">
                  Make sure to have all the labels you will need already
                  created. To edit or delete an existing Medicine, search for it
                  on the dashboard, and then click the edit button at the bottom
                  of the document.
                </p>
              </div>
              <Link
                to="/create-medicine"
                className=" btn btn-accent h-12 w-24 mt-4 mx-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                Create
              </Link>
            </div>
            <div className="border rounded p-4 md:p-12 flex flex-col my-4 shadow-md hover:bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold uppercase py-4">
                  Procedures
                </h2>
                <p className=" p-4 text-xl">
                  Create a Procedure with the labels you made, add a table, and
                  a flow chart if needed. Pictures can be added after you create
                  the procedure.
                </p>
                <p className="px-4 text-gray-600">
                  Make sure to have all the labels you will need already
                  created. To edit or delete an existing Procedure, search for
                  it on the dashboard, and then click the edit button at the
                  bottom of the document.
                </p>
              </div>
              <Link
                to="/create-procedure"
                className=" btn btn-accent h-12 w-24 mt-4 mx-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                Create
              </Link>
            </div>
            <div className="border rounded p-4 md:p-12 flex flex-col my-4 shadow-md hover:bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold uppercase py-4">Protocols</h2>
                <p className=" p-4 text-xl">
                  Create a Protocol with the labels you made, add a table, and a
                  flow chart if needed. Pictures can be added after you create
                  the Protocol.
                </p>
                <p className="px-4 text-gray-600">
                  Make sure to have all the labels you will need already
                  created. To edit or delete an existing Protocol, search for it
                  on the dashboard, and then click the edit button at the bottom
                  of the document.
                </p>
              </div>
              <Link
                to="/create-protocol"
                className=" btn btn-accent h-12 w-24 mt-4 mx-4 shadow-md"
                onClick={() => window.scrollTo(0, 0)}
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
