import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavBar() {
  return (
    <div className=" p-4 mt-12 container mx-auto rounded from-accent via-teal-500 to-purple-600 bg-gradient-to-r w-full text-white md:text-2xl my-12">
      <ul className="flex justify-around sm:flex-row flex-wrap">
        <Link to="/dashboard" className="p-2 cursor-pointer hover:underline">
          Dashboard
        </Link>
        <Link to="/create-new" className="p-2 cursor-pointer hover:underline">
          Create New
        </Link>
        <Link
          to="/employee-list"
          className="p-2 cursor-pointer hover:underline"
        >
          Employees
        </Link>
        <Link to="/wait-list" className="p-2 cursor-pointer hover:underline">
          Wait List
        </Link>
        <Link to="/image-center" className="p-2 cursor-pointer hover:underline">
          Images
        </Link>
        <Link
          to="billing-center"
          className="p-2 cursor-pointer hover:underline"
        >
          Billing Center
        </Link>
      </ul>
    </div>
  );
}
