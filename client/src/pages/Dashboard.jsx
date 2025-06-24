import React  from "react";
import Summary from "../components/Summary";
import Violation from "../components/Violation";
import { useSelector } from "react-redux";

function Dashboard() {
  const { result } = useSelector((state) => state.result);
  return (
    <div className="min-h-screen w-full bg-[#121212]">
      <div className="w-full flex flex-col justify-center items-center gap-10 pt-20">
        {/* Tiles for report summary */}
        <div className=" w-[80vw] flex flex-col gap-10 md:gap-15 ">
          <div className="">
            <h1 className="text-4xl font-semibold">Report Analysis</h1>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center lg:justify-evenly gap-[4%] gap-y-6">
            <div className="dashboardHoverAnimation w-[max(300px,20%)] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
              <h1 className="text-3xl font-bold">{result.violations.length!==0?result.violations.length:"0"}</h1>
              <h2 className="font-semibold">Violations</h2>
            </div>

            <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
              <h1 className="text-3xl font-bold">{result.passes.length!==0?result.passes.length:"0"}</h1>
              <h2 className="font-semibold">Passes</h2>
            </div>

            <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
              <h1 className="text-3xl font-bold">{result.incomplete.length!==0?result.incomplete.length:"0"}</h1>
              <h2 className="font-semibold">Incomplete</h2>
            </div>

            <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
              <h1 className="text-3xl font-bold">{result.inapplicable.length!==0?result.inapplicable.length:"0"}</h1>
              <h2 className="font-semibold">Inapplicable</h2>
            </div>
          </div>
        </div>
        {/* Summary */}

        <div className="w-[80vw]">
          <Summary data={result}/>
        </div>

        <div className="w-[80vw]">
          <Violation topic="Violations" data={result.violations}/>
        </div>

        <div className="w-[80vw]">
          <Violation topic="Inapplicable" data={result.inapplicable}/>
        </div>

        <div className="w-[80vw]">
          <Violation topic="Passes" data={result.passes}/>
        </div>

        <div className="w-[80vw]">
          <Violation topic="Incomplete" data={result.incomplete}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
