import React from "react";
import contact from "src/images/contact-us.svg";

export default function ContactUs() {
  return (
    <div className="min-h-screen">
      <div className="container flex flex-col justify-between bg-gray-100 mt-24 mx-auto border rounded p-12 shadow-lg min-h-screen">
        <div>
          <div className="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font">
            Contact Us
          </div>
          <div className="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font">
            We would love to hear from you
          </div>
          <div className="flex mb-8 text-gray-500 leading-relaxed text-left">
            We are a small US based company out of Oregon and operate between
            8:00 am - 5:00 PM PST
          </div>
          <div className=" mt-24 flex flex-row justify-around items-start">
            <div
              tabindex="0"
              className="collapse w-96 border rounded-box border-base-300 "
            >
              <div className="collapse-title text-xl font-medium">
                Reach out by phone
              </div>
              <div className="collapse-content">
                <p>555-555-5555</p>
              </div>
            </div>

            <div
              tabindex="0"
              className="collapse w-96 border rounded-box border-base-300"
            >
              <div className="collapse-title text-xl font-medium">
                Reach out by Email
              </div>
              <div>
                <div className="collapse-content">
                  <p>email@email.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img className="mx-auto" src={contact} alt="contact" />
      </div>
    </div>
  );
}
