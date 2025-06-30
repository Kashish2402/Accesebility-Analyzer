import React from "react";

function Loading({ analyzing }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src="./Loader.gif" alt="Loader" />
        {analyzing === "analyze" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-white">Wait for few seconds</h1>
            <h1 className="text-white">We are analyzing your website</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loading;
