import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "src/components/context/UserContext";

export default function CreateNewPage() {
  const { userData } = useContext(UserContext);

  return (
    <div className="container mx-auto">
      <div>Create Sections walkthrough</div>
      {userData.user && userData.user.employee_type === 4 && (
        <div className=" bg-white flex flex-row flex-wrap justify-between  card border shadow-xl px-4 py-4 mb-12">
          <Link to="/create-document-header" className="btn btn-accent my-4">
            Document Labels
          </Link>
          <Link to="/create-medicine" className="btn btn-accent my-4">
            Create New Medicine
          </Link>
          <Link to="/create-procedure" className="btn btn-accent my-4">
            Create New Procedure
          </Link>
          <Link to="/create-protocol" className="btn btn-accent my-4">
            Create New Protocol
          </Link>
        </div>
      )}
    </div>
  );
}
