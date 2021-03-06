import React, { useRef } from "react";
import { Link } from "react-router-dom";

import CostCalculator from "src/components/dashboard/components/CostCalculator";
import HomePageSteps from "src/components/dashboard/components/HomePageSteps";
import MoreInfoSection from "src/components/dashboard/pages/MoreInfoSection";

import notes from "src/images/notes.svg";
import wave from "src/images/wave1.svg";

export default function HomePage() {
  // This is the '/' of the app
  // basic layout with custom html css to display specific information.
  // Nothing Crazy.
  const learnMore = useRef(null);

  const toMore = () => {
    window.scrollTo(0, learnMore.current.offsetTop);
  };
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen">
      <div className=" flex flex-col md:flex-row mt-24 container mx-auto">
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-4xl font-bold py-4 text-black">OurProtocol</h1>
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
            <button className="btn btn-outline btn-accent" onClick={toMore}>
              Learn more here
            </button>
            <Link to="/register" className="btn  btn-accent" onClick={toTop}>
              Register Today
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0">
          <img src={notes} alt="showcase" />
        </div>
      </div>
      <div
        className="bg-gray-100 bg-local bg-no-repeat bg-left-bottom "
        style={{ backgroundImage: `url(${wave}) ` }}
      >
        <div className="text-center p-12 text-4xl font-bold ">
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
                  The monthly cost is $50 + $18.75 per 25 users. ($0.75 per
                  additional user)
                </li>
                <li className="my-4 text-sm px-2  text-gray-700">
                  Your first 25 users are free
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
      <div ref={learnMore}>
        <MoreInfoSection />
      </div>
      <div>
        <HomePageSteps />
      </div>
    </div>
  );
}
