import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function Violation({ topic, data }) {
  const { loading } = useSelector((state) => state.result);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col gap-5 pb-8 overflow-x-hidden">
          <h1 className="text-3xl font-semibold">{topic}</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-500/10 divide-x divide-gray-500/40">
                <tr>
                  <th className="px-3 py-2 font-bold">id</th>
                  <th className="px-3 py-2 font-bold">impact</th>
                  <th className="px-3 py-2 font-bold">Description</th>
                  <th className="px-3 py-2 font-bold">Help</th>
                  <th className="px-3 py-2 font-bold">HelpUrl</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-transparent" : "bg-gray-500/10"
                      } divide-x divide-gray-500/40`}
                    >
                      <td className="px-3 py-2">{item.id}</td>
                      <td className="px-3 py-2">
                        {item.impact === null ? "null" : item.impact}
                      </td>
                      <td className="px-3 py-2">{item.description}</td>
                      <td className="px-3 py-2">{item.help}</td>
                      <td className="px-3 py-2">
                        <a
                          href={item.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {item.helpUrl}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Violation;
