import React, { useState, useEffect } from "react";

export default function OfflineBanner({ timeout }) {
  const [timeoutDate, setTimeoutDate] = useState();
  const [allowBanner, setAllowBanner] = useState(true);

  useEffect(() => {
    // setTimeoutDate(new Date(timeout));

    if (timeout) {
      let fulldate = new Date(timeout);
      setTimeoutDate(fulldate);
    }
  }, [timeout]);

  return (
    <div className="bg-warning md:w-1/2 mx-auto rounded items-center justify-center flex mb-12">
      {allowBanner && (
        <div className="flex justify-center items-center p-2">
          <div className="p-2 text-center text-xl">
            Please login by {timeoutDate && timeoutDate.toDateString()} to
            maintain offline access
          </div>
          <button
            className="btn btn-square btn-sm"
            onClick={() => {
              setAllowBanner(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
