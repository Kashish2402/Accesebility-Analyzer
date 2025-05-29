import React, { useState } from "react";
import bg1 from "../assets/images/bg1.jpg";
import Password from "../components/Password";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/authSlice";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [showError, setShowError] = useState(error);

  const validateEmail = () => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.text(email);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formData.username) {
      setShowError("Please enter a username");
      return;
    }
    if (!formData.fullName) {
      setShowError("Please enter a full name");
      return;
    }
    if (!formData.email) {
      if (!validateEmail(formData.email)) setShowError("Please enter an email");
      return;
    }
    dispatch(signUp());
    navigate("/");
  };
  return (
    <div
      className="min-h-screen w-screen bg-cover"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="w-full min-h-screen backdrop-brightness-50  flex items-center justify-center">
        <div className="border border-gray-600/70 rounded-2xl py-4 flex flex-col items-center w-[min(450px,80vw)] bg-black/50 backdrop-blur-2xl">
          <h1 className="text-white/80 great-vibes text-3xl font-semibold">
            Bright-Access
          </h1>

          <h1 className="my-6 text-3xl font-semibold text-center w-full">
            Create your Account
          </h1>

          <div className="w-[90%] flex flex-col items-center justify-center gap-5">
            <div className="w-full">
              <label htmlFor="fullName" className="w-full text-lg ml-2">
                Full Name:{" "}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                placeholder="Enter fullName"
              />
            </div>

            <div className="w-full">
              <label htmlFor="username" className="w-full text-lg ml-2">
                Username:{" "}
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                placeholder="Enter username"
              />
            </div>

            <div className="w-full">
              <label htmlFor="email" className="w-full text-lg ml-2">
                Email:{" "}
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                placeholder="Enter email"
              />
            </div>

            <div className="w-full">
              <Password
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="w-full">
              <label htmlFor="age" className="w-full text-lg ml-2">
                Date of birth:{" "}
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                placeholder="Enter DOB"
              />
            </div>

            <div className="w-full flex items-center gap-6">
              <label htmlFor="Gender" className=" text-lg ml-2">
                Gender:{" "}
              </label>
              <div className="flex items-center  gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                    placeholder="Enter DOB"
                  />
                  <span className="text-white/70">Male</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full bg-black rounded-2xl py-2 px-4 text-white/60 border-b border-gray-600 outline-none"
                    placeholder="Enter DOB"
                  />
                  <span className="text-white/70">Female</span>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-5 bg-blue-800 py-2 rounded-2xl cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-blue-800 hover:text-blue-800 font-bold"
              onClick={handleSignUp}
            >
              Create Account
            </button>

            {showError && <p className="text-red-700 font-sm">${showError}</p>}
          </div>

          <div className="w-[90%] mt-6 px-4 flex items-center justify-between">
            <div className="w-1/2 border border-gray-500/60"></div>
            <p className="text-gray-500/70 font-bold px-2">or</p>
            <div className="w-1/2 border border-gray-500/60"></div>
          </div>
          <button
            className="w-[90%] mt-8 bg-blue-800 py-2 rounded-2xl cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-blue-800 hover:text-blue-800 font-bold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
