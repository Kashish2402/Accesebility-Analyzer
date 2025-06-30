import React, { useEffect, useRef } from "react";
import Summary from "../components/Summary";
import Violation from "../components/Violation";
import { useDispatch, useSelector } from "react-redux";
import { getResult } from "../features/ResultsSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";
import PdfTemplate from "../utils/DownloadReport";

function Dashboard() {
  const { result, loading } = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(getResult(id));
      }
    };
    fetchData();
  }, [id, dispatch]);

  const downloadReport = () => {
    const element = pdfRef.current;

    if (!element) {
      return;
    }
    const opt = {
      margin: 0.5,
      padding: 2,
      filename: "test-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!result) return null;
  if (loading) return <Loading analyzing={false}/>;
  return (
    <div className="min-h-screen w-full bg-[#121212]">
      <div className="w-full flex flex-col justify-center items-center gap-10 pt-20">
        {/* Tiles for report summary */}
        <div className=" w-[80vw] flex flex-col gap-10 md:gap-15 ">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-4xl font-semibold">Report Analysis</h1>
            <button
              className="cursor-pointer bg-blue-700 rounded-lg py-2 px-4 font-bold"
              onClick={() => downloadReport()}
            >
              Download Report
            </button>
          </div>
          <div className=" w-[80vw] flex flex-col gap-10 md:gap-15 ">
            <div className="w-full flex flex-wrap items-center justify-center lg:justify-evenly gap-[4%] gap-y-6">
              <div className="dashboardHoverAnimation w-[max(300px,20%)] h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
                <h1 className="text-3xl font-bold">
                  {result.violations?.length !== 0
                    ? result.violations?.length
                    : "0"}
                </h1>
                <h2 className="font-semibold">Violations</h2>
              </div>

              <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
                <h1 className="text-3xl font-bold">
                  {result.passes.length !== 0 ? result.passes.length : "0"}
                </h1>
                <h2 className="font-semibold">Passes</h2>
              </div>

              <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
                <h1 className="text-3xl font-bold">
                  {result.incomplete.length !== 0
                    ? result.incomplete.length
                    : "0"}
                </h1>
                <h2 className="font-semibold">Incomplete</h2>
              </div>

              <div className="dashboardHoverAnimation w-[max(300px,20%)]  h-[100px] bg-[#1b191b] rounded-b-3xl flex flex-col items-center justify-center rounded-t-md cursor-pointer">
                <h1 className="text-3xl font-bold">
                  {result.inapplicable.length !== 0
                    ? result.inapplicable.length
                    : "0"}
                </h1>
                <h2 className="font-semibold">Inapplicable</h2>
              </div>
            </div>
          </div>
          {/* Summary */}

          <div className="w-[80vw]">
            <Summary data={result} />
          </div>

          <div className="w-[80vw]">
            <Violation topic="Violations" data={result.violations} />
          </div>

          <div className="w-[80vw]">
            <Violation topic="Inapplicable" data={result.inapplicable} />
          </div>

          <div className="w-[80vw]">
            <Violation topic="Passes" data={result.passes} />
          </div>

          <div className="w-[80vw]">
            <Violation topic="Incomplete" data={result.incomplete} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div id="test-pdf" ref={pdfRef}>
          <PdfTemplate result={result} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
