import React from "react";
import { axiosTestInstance, axiosInstance } from "src/axiosInstance";

export default function GetImages() {
  const requestImages = () => {
    axiosTestInstance
      .get(
        "https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp"
      )
      .then((res) => console.log(res));
  };
  return (
    <div>
      <button
        onClick={() => {
          requestImages();
        }}
        className="btn"
      >
        Download Images
      </button>
      <img
        src="https://ourprotocol-server-1.s3.amazonaws.com/images/Lane%20County/Dextrose/dextrose-5percent.webp"
        alt=""
      />
    </div>
  );
}
