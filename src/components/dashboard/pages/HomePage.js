import React from "react";

import CostCalculator from "../components/CostCalculator";

import notes from "../../../images/notes.svg";

export default function HomePage() {
  return (
    <div>
      <div className=" flex flex-col md:flex-row mt-24 container mx-auto">
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-4xl font-bold py-4 text-black">Our Protocol</h1>
          <p className="mb-8 text-2xl font-black tracking-tighter text-gray-700 md:text-3xl title-font px-4">
            The world's first EMS specific protcol platform.
          </p>
          <p className="tracking-tight text-gray-500 text-xl px-4 mb-8">
            Bring your agency's medicine instructions, procedures, and protocols
            to the digital era.
          </p>
          <p className="tracking-tight text-gray-500 text-xl px-4 mb-8">
            Ensure staff have the correct information at all times.
          </p>
          <p className="tracking-tight text-gray-500 text-xl px-4 mb-8">
            Increase patient care by making information readily avaliable.
          </p>
          <div className="flex justify-around">
            <button className="btn btn-outline btn-accent">
              Learn more here
            </button>
            <button className="btn  btn-accent">Register Today</button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0">
          <img src={notes} alt="" />
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="text-center py-12 text-4xl font-bold ">
          Scaled Pricing
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full p-4 xl:w-1/4 md:w-3/6 mx-auto">
            <div className="relative flex flex-col h-full p-8 transition duration-500 ease-in-out transform bg-white border rounded-lg shadow-xl">
              <strong className="flex items-end mx-auto text-3xl font-black leading-none text-black ">
                <span>Starting at $50</span>
              </strong>
              <ul className="list-disc">
                <li className="my-4 text-sm  px-2 text-gray-700">
                  The monthly cost is $50 + $2 per user per month.
                </li>
                <li className="my-4 text-sm px-2  text-gray-700">
                  Your first 5 users are free
                </li>
                <li className="my-4 text-sm px-2  text-gray-700">
                  Phone Support & Email Support
                </li>
              </ul>
              <div className="text-base">
                Use our cost calculator to estimate your monthly cost
              </div>
            </div>
          </div>
          <CostCalculator />
        </div>
      </div>
    </div>
  );
}
