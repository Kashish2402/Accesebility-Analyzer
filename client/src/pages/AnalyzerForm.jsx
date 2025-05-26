import React from "react";
import bg from "../assets/images/bg.jpg";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AnalyzerForm({ sideBarRef, showMenu, toggleMenu }) {
  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center relative`}
    >
      <Navbar showMenu={showMenu} toggleMenu={toggleMenu} />
      {showMenu && (
        <Sidebar
          toggleMenu={toggleMenu}
          showMenu={showMenu}
          sideBarRef={sideBarRef}
        />
      )}
      <div className="h-full w-full absolute -z-100">
        <img
          src={bg}
          alt="background-image"
          className="h-full w-full object-cover object-top"
          style={{ filter: "brightness(0.4)" }}
        />
      </div>

      <div className="w-[min(80%,800px)] my-40 md:my-0 flex gap-5 flex-col items-center justify-center">
        <h1 className="text-4xl  text-center font-semibold oleo md:text-5xl ">
          Accessebility Analyzer
        </h1>
        <p className="text-gray-300">
          Instantly scan your website for accessibility issues like missing alt
          text, low contrast, and improper headings. Make your site inclusive
          and WCAG-compliant in just a few clicks.
        </p>

        <div className="w-full bg-black/80 rounded-xl px-4 py-4">
          <h1 className="border-b pb-3 border-b-white/30 text-center font-semibold mb-5">
            Analyze your work
          </h1>

          <div className="w-full flex flex-col md:flex-row gap-2 divide-y md:divide-y-0 md:divide-x divide-gray-300/50">
            <div className="md:w-1/2 md:h-[200px] pb-3 md:pb-0 flex flex-col items-center justify-center pr-2 gap-2">
              <label htmlFor="url" className="w-full ml-5">
                Test Url
              </label>
              <input
                type="text"
                className="bg-black outline-none w-full border-b border-gray-500/30 py-2 px-4 rounded-xl"
                placeholder="Enter a URL"
              />
            </div>

            <div className="md:w-1/2 h-[200px] rounded-xl border border-dashed border-gray-500/30 text-gray-400 flex items-center justify-center mt-3 md:m-0">
              <label
                htmlFor="file"
                className="cursor-pointer hover:text-white transition"
              >
                <input type="file" id="file" className="hidden" />
                Drop a HTML file to analyze
              </label>
            </div>
          </div>

          <button className="w-full  hover:from-lime-400 bg-white/80 text-black py-2 mt-4 font-bold rounded-2xl transition cursor-pointer">
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyzerForm;
