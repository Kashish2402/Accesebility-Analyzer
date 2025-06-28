import React from "react";

function Summary({ data }) {
  return (
    <div className="w-full flex flex-col gap-5 overflow-x-hidden">
      <h2 className="text-3xl font-semibold">Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-500/10 divide-x divide-gray-500/40">
            <tr className="bg-black/20 divide-x px-2 divide-gray-600/50 ">
              <td className="w-[30%] py-1 px-3 rounded-t-lg">
                <strong>Test Engine:</strong>
              </td>
              <td className="w-[70%] text-center rounded-t-lg">
                {data?.testEngine?.name} (v({data?.testEngine?.version}))
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-500/10 divide-gray-600/50 divide-x px-2">
              <td className="w-[30%] py-1 px-3">
                <strong>Test Runner:</strong>
              </td>
              <td className="w-[70%] text-center">{data?.testRunner?.name}</td>
            </tr>

            <tr className="bg-black/20 divide-gray-600/50 divide-x px-2">
              <td className="w-[30%] py-1 px-3">
                <strong>User Agent:</strong>
              </td>
              <td className="w-[70%] text-center">
                {data?.environment?.userAgent}
              </td>
            </tr>

            <tr className="bg-gray-500/10 divide-gray-600/50 divide-x px-2">
              <td className="w-[30%] py-1 px-3">
                <strong>Window size:</strong>
              </td>
              <td className="w-[70%] text-center">
                {data?.environment?.windowWidth} x{" "}
                {data?.environment?.windowHeight}
              </td>
            </tr>

            <tr className="bg-black/20 divide-gray-600/50 divide-x px-2">
              <td className="w-[30%] py-1 px-3">
                <strong>URL:</strong>
              </td>
              <td className="w-[70%] text-center">{data?.url}</td>
            </tr>

            <tr className="bg-gray-500/10 divide-x divide-gray-600/50  px-2 ">
              <td className="w-[30%] py-1 px-3 rounded-b-lg">
                <strong>TimeStamp:</strong>
              </td>
              <td className="w-[70%] text-center rounded-b-lg">
                {data?.createdAt}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;
