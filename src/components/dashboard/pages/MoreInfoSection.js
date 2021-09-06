import React from "react";
import test from "../../../images/test1.gif";

export default function MoreInfoSection() {
  return (
    <div className="container mx-auto mt-12">
      <div className="flex flex-col md:flex-row justify-start">
        <div className="mockup-phone border-accent">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard phone-1 artboard-demo">
              <img src={test} alt="" />
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="text-4xl font-bold py-4 text-black">
            OurProtocol information:
          </div>
          <p className="p-4 ">
            Every agency has its own guidelines for medications, procedures, and
            protocols. OurProtocol allows you to create, update, and distribute
            custom documentiation that all of your EMTs, Paramedics, RNs, or
            other profesionals can easily access.
          </p>
          <span className="text-2xl p-4  font-bold italic text-gray-600">
            OurProtocol works offline
          </span>
          <p className="p-4">
            After the documentation is created by your medical director, any
            user allowed in your agency's profile will have access to instant
            updates on their phone app. But most importantly, if they do not
            have access to the internet while on duty - the app will continue to
            work and operate.
          </p>
          <ul className=" ml-12 py-4 list-disc">
            <li className="py-4">
              Custom category groups for Medicine, Procedures, and protocols.
            </li>
            <li className="py-4">Custom flowcharts to improve workflow</li>
            <li className="py-4">
              Auto updates when the user has an internet connection
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
