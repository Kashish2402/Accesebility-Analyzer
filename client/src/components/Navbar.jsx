import React from "react";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { reset } from "../features/ResultsSlice";

function Navbar({ toggleMenu }) {
  const { authUser,isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  return (
    <div className="absolute top-[5vh] md:top-[10vh] left-1/2 -translate-x-1/2 w-[90%] md:w-3/4  bg-black/40 drop-shadow-2xl z-2 py-3 px-10 rounded-4xl flex items-center justify-between">
      <h1
        className="text-white/80 great-vibes text-2xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Bright-Access
      </h1>

      <div className="flex items-center justify-center gap-5">
        {!isAuthenticated && (
          <div className="hidden md:flex items-center md:gap-2">
            <button
              className="cursor-pointer border-2 border-transparent px-4 py-2 hover:bg-white/80 hover:text-black rounded-2xl font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="cursor-pointer bg-white/80 px-4 font-semibold py-2 rounded-2xl text-black border-2 border-transparent hover:border-white/80 hover:bg-transparent hover:text-white/80 transition-colors ease-in"
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </button>
          </div>
        )}

        {isAuthenticated && (
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-1">
              <div className="size-10 bg-green-700 rounded-full text-[20px] font-semibold flex items-center justify-center cursor-pointer">
                {authUser?.username?.slice(0, 1).toUpperCase()}
              </div>
              <p className="text-[16px]">Hi, {authUser?.fullName}</p>
            </div>

            <button>
              <LogOut
                className="size-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                  dispatch(reset())
                }}
                aria-label="Logout"
              />
            </button>
          </div>
        )}
        <button className="flex cursor-pointer" onClick={toggleMenu}>
          <AlignJustify />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
