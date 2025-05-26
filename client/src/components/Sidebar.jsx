import { History, Home, Search, User2, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

function Sidebar({ toggleMenu, showMenu,sideBarRef, authUser = null }) {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute top-0 left-0 bg-black/70 backdrop-blur-sm z-100 h-full w-[min(450px,90vw)] ${
        showMenu ? "transition-x-0" : "transition-x-full"
      }`}
      ref={sideBarRef}
    >
      <div className="w-full h-[15vh] text-4xl font-semibold flex items-center justify-center relative">
        <h1 className="pb-4 border-b w-[90%] text-center">Main Menu</h1>

        <div className="absolute right-5 top-5">
          <X
            className="cursor-pointer hover:bg-white/40 p-2 size-9 rounded-full"
            onClick={toggleMenu}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <ul className="w-full flex items-center flex-col justify-center divide-y divide-gray-500/40">
          <li
            className="py-6 w-full flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            <Home />
            Home
          </li>
          <li
            className="py-6 w-full flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            <Search />
            Analyzer
          </li>
          <li
            className="py-6 w-full flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              navigate("/history");
              toggleMenu();
            }}
          >
            <History />
            History
          </li>
          <li
            className="py-6 w-full flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500/20"
            onClick={() => {
              navigate("/profile");
              toggleMenu();
            }}
          >
            <User2 />
            Profile
          </li>
          {!authUser && (
            <li className="md:hidden py-6 w-full flex items-center justify-center gap-3 cursor-pointer">
              <button
                className="cursor-pointer border-2 border-transparent px-4 py-2 hover:bg-white/80 hover:text-black rounded-2xl font-semibold"
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
              >
                Login
              </button>
            </li>
          )}

          {!authUser && (
            <li className="md:hidden py-6 w-full flex items-center justify-center gap-3 cursor-pointer">
              <button
                className="cursor-pointer bg-white/80 px-4 font-semibold py-2 rounded-2xl text-black border-2 border-transparent hover:border-white/80 hover:bg-transparent hover:text-white/80 transition-colors ease-in"
                onClick={() => {
                  navigate("/signup");
                  toggleMenu();
                }}
              >
                Sign Up
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
