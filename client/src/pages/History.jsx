import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteResults, getUserResults } from "../features/ResultsSlice";
import { format } from "date-fns"; // Optional: For date formatting
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function History() {
  const { userResults, loading } = useSelector((state) => state.result);
  const [message, setMessage] = useState(false);
  const [rId, setRId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserResults());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="relative w-full">
      <div className="my-20 w-[300px] md:w-[80vw] mx-auto overflow-hidden">
        <h1 className="text-4xl border-b pb-4 md:pl-2 border-b-gray-500/40">
          Your Past Reports
        </h1>

        <div className="w-full mt-14 overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="flex justify-between border-b border-gray-600/40 mb-3">
                <th className="px-3 py-2 font-bold w-1/4 text-left">Title</th>
                <th className="px-3 py-2 font-bold w-1/6 text-left">
                  Violations
                </th>
                <th className="px-3 py-2 font-bold w-1/6 text-left">Passes</th>
                <th className="px-3 py-2 font-bold w-1/6 text-left">
                  Optimised
                </th>
                <th className="px-3 py-2 font-bold w-1/4 text-left flex items-center gap-1">
                  Created At 
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userResults.map((report) => (
                <tr
                  key={report._id}
                  className="flex justify-between border-b border-gray-700/20 hover:bg-gray-800/30 cursor-pointer"
                >
                  <td
                    className="px-3 py-2 w-1/4 hover:underline active:text-blue-600"
                    onClick={() => navigate(`/results/${report._id}`)}
                  >
                    {report.url.slice(0, 32) + "..."}
                  </td>
                  <td className="px-3 py-2 w-1/6">
                    {report.summary?.totalViolations ?? 0}
                  </td>
                  <td className="px-3 py-2 w-1/6">
                    {report.summary?.totalPasses ?? 0}
                  </td>
                  <td className="px-3 py-2 w-1/6">
                    {report.summary?.totalPasses
                      ? `${Math.round(
                          (report.summary.totalPasses /
                            (report.summary.totalPasses +
                              report.summary.totalViolations)) *
                            100
                        )}%`
                      : "N/A"}
                  </td>
                  <td className="px-3 py-2 w-1/4">
                    {format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
                  </td>

                  <td>
                    <button
                      className="bg-red-700 py-2 px-3 cursor-pointer rounded-2xl"
                      onClick={() => {
                        setMessage((prev) => !prev);
                        setRId(report?._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {userResults.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {message && (
        <div className="absolute top-[10%] left-[50%] -translate-1/2 flex items-center justify-center bg-black py-3 px-5">
          <div className="w-[300px]">
            <p>Are you sure wants to delete the record?</p>
            <div className="flex gap-6 items-center justify-center mt-5">
              <button
                className="bg-red-600 px-3 py-2 rounded-xl cursor-pointer"
                onClick={() => {
                  dispatch(deleteResults(rId));
                  setMessage((prev) => !prev);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-800/60 px-3 py-2 cursor-pointer rounded-xl"
                onClick={() => setMessage((prev) => !prev)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
