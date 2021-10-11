import React from "react";

export default function Footer() {
  return (
    <div className=" min-h-48  mt-24  items-center bg-accent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-center py-12 ">
        <div className="p-2 text-4xl font-medium tracking-tighter text-white">
          OurProtocol
        </div>
        <div className="flex flex-col justify-between p-2 text-white text-xl cursor-pointer">
          <div>Contact</div>

          <div>About Us</div>
        </div>
      </div>
    </div>
  );
}
