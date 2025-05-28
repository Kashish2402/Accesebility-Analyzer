import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[#121212] flex justify-center">
      <div className="pt-20 w-[80vw] flex flex-col gap-10 md:gap-15">
        <div className="">
          <h1 className="text-4xl font-semibold">Report Analysis</h1>
        </div>

        <div className="w-full flex flex-wrap items-center justify-center lg:justify-start gap-7">
          <div className="dashboardHoverAnimation w-[300px] h-[100px] bg-[#1b191b] rounded-t-md rounded-b-3xl flex flex-col items-center justify-center cursor-pointer hover:shadow-xl ">
            <h1 className="text-3xl font-bold">0</h1>
            <h2 className="font-semibold">Violations</h2>
          </div>

          <div className="dashboardHoverAnimation w-[300px] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
            <h1 className="text-3xl font-bold">0</h1>
            <h2 className="font-semibold">Violations</h2>
          </div>

          <div className="dashboardHoverAnimation w-[300px] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
            <h1 className="text-3xl font-bold">0</h1>
            <h2 className="font-semibold">Passes</h2>
          </div>

          <div className="dashboardHoverAnimation w-[300px] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
            <h1 className="text-3xl font-bold">0</h1>
            <h2 className="font-semibold">Incomplete</h2>
          </div>

          <div className="dashboardHoverAnimation w-[300px] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
            <h1 className="text-3xl font-bold">0</h1>
            <h2 className="font-semibold">Inapplicable</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
