import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" min-h-48  mt-24  items-center bg-accent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center py-12 ">
        <Link
          to="/"
          className="p-2 text-4xl font-medium tracking-tighter text-white"
          onClick={() => window.scrollTo(0, 0)}
        >
          OurProtocol
        </Link>
        <div className="flex flex-col justify-between p-2 text-white text-xl">
          <Link
            to="/contact-us"
            className="cursor-pointer hover:text-gray-300 hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            Contact Us
          </Link>

          {/* <Link
            to="about-us"
            className="cursor-pointer hover:text-gray-300 hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            About Us
          </Link> */}
        </div>
      </div>
    </div>
  );
}
