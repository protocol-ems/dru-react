import React from "react";
import { Link } from "react-router-dom";


export default function SubscribeToday() {
  return (
    <div>
      <div className="border bg-gray-100 text-2xl p-4 text-center">
        <Link
          className="hover:underline text-accent"
          to="/create-subscription"
          onClick={() => window.scrollTo(0, 0)}
        >
          Subscribe today
        </Link>{" "}
        to unlock Image uploads, and multiple user access to OurProtocol.
      </div>
    </div>
  );
}
