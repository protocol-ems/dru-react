import React from "react";

export default function Error({ errorMessage, clearError }) {
  // This error message can be put and pulled wherever.
  // currently I have it so the cancel logic and error message need to be set as a state in the component it will be used in.

  return (
    <div className="alert container mx-auto z-20 alert-error ">
      <div className="flex-1">
        <label className="mx-3">{errorMessage}</label>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-ghost mr-2" onClick={clearError}>
          X
        </button>
      </div>
    </div>
  );
}
