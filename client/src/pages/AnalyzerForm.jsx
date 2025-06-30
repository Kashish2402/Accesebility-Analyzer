import React, { useState } from "react";
import bg from "../assets/images/bg.jpg";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { analyzePdf, analyzeUrl } from "../features/ResultsSlice";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

function AnalyzerForm({ sideBarRef, showMenu, toggleMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { loading, error , isAuthenticated} = useSelector((state) => state.result);
  const [showError, setShowError] = useState(error);
  const [message,setMessage]=useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isAuthenticated){
      setMessage(true)
    }
    if (!file && !url) {
      setShowError("Please select a file or enter a URL");
      return;
    }
    setShowError("");
    if (url) {
      try {
        const res = await dispatch(analyzeUrl({ url }));
        if (res?.payload?._id) {
          navigate(`/results/${res.payload?._id}`);
        } else {
          setShowError("Something went wrong, please try again.");
        }
      } catch (error) {
        setShowError(error.message);
      }
    }
    if (file) {
      try {
        const formData = new FormData();
        formData.append("upladedFile", file);
        const res = await dispatch(analyzePdf(formData));
        if (res?.payload?._id) {
          navigate(`/results/${res.payload?._id}`);
        } else {
          setShowError("Something went wrong, please try again.");
        }
      } catch (error) {
        setShowError(error.message);
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loading analyzing="analyze"/>
      ) : (
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
              Instantly scan your website for accessibility issues like missing
              alt text, low contrast, and improper headings. Make your site
              inclusive and WCAG-compliant in just a few clicks.
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
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className="md:w-1/2 h-[200px] rounded-xl border border-dashed border-gray-500/30 text-gray-400 flex items-center justify-center mt-3 md:m-0 relative">
                  <label
                    htmlFor="file"
                    className="cursor-pointer hover:text-white transition"
                  >
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      accept=".html"
                      onChange={handleFileChange}
                    />
                    Drop a HTML file to analyze
                  </label>

                  {preview && (
                    <div className="absolute bottom-0 left-2 h-full w-full flex items-end mb-3 z-100">
                      <h1>File Selected: {preview.name}</h1>
                    </div>
                  )}
                </div>
              </div>
              <p className="w-full text-center mt-3 text-red-700">
                {showError && showError}
              </p>
              <button
                className="w-full  hover:from-lime-400 bg-white/80 text-black py-2 mt-4 font-bold rounded-2xl transition cursor-pointer"
                onClick={handleSubmit}
              >
                Analyze
              </button>

              {
                message && (
                  <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/60 rounded-2xl flex flex-col items-center justify-center gap-5">
                    <h1>Please login to analyze your website</h1>
                    <button className="bg-blue-700 p-2 cursor-pointer" onClick={()=>setMessage(!message)}>Ok</button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnalyzerForm;
