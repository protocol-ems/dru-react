import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" min-h-48  mt-24  items-center bg-accent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center py-12 ">
        <div className="p-2 text-4xl font-medium tracking-tighter text-white">
          OurProtocol
        </div>
        <div className="flex flex-col justify-between p-2 text-white text-xl">
          <Link
            to="/contact-us"
            className="cursor-pointer hover:text-gray-300 hover:underline"
          >
            Contact
          </Link>

          <Link
            to="about-us"
            className="cursor-pointer hover:text-gray-300 hover:underline"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
