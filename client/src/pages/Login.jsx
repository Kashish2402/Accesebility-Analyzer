import React, { useState } from "react";
import bg1 from "../assets/images/bg1.jpg";
import Password from "../components/Password";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login, guestLogin } from "../features/authSlice";
import { Loader, User2 } from "lucide-react";
import Loading from "../components/Loading";

function Login() {
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [showError, setShowError] = useState(error);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setShowError("Please enter a valid Email address!!!");
      return;
    }
    if (!formData.password) {
      setShowError("Please enter a valid password!!!");
      return;
    }
    await dispatch(login(formData));
    
    setShowError("");
    navigate("/");
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    await dispatch(guestLogin());
    
    setShowError("");
    navigate("/");
  };

  if(isLoading)return <Loading analyzing={false}/>
  return (
    <div
      className="h-screen w-screen bg-cover"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="w-full h-full backdrop-brightness-50  flex items-center justify-center">
        <div className="border border-gray-600/70 rounded-2xl py-4 flex flex-col items-center w-[min(450px,80vw)] bg-black/50 backdrop-blur-2xl">
          <h1
            className="text-white/80 great-vibes text-3xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Bright-Access
          </h1>

          <h1 className="my-6 text-3xl font-semibold w-full text-center">
            Login
          </h1>

          <div className="w-[90%] flex flex-col items-center justify-center gap-5">
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

            <button
              className="w-full mt-5 bg-blue-800 py-2 rounded-2xl cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-blue-800 hover:text-blue-800 font-bold flex items-center justify-center transition-all ease-in duration-150 delay-50"
              onClick={handleLogin}
            >
              "Login"
            </button>

            <button
              className="w-full flex items-center bg-transparent justify-center py-2 gap-3 border-2 rounded-2xl border-blue-800 cursor-pointer text-blue-800 font-bold hover:bg-blue-800 hover:text-white transition-all ease-in duration-150 delay-50"
              onClick={handleGuestLogin}
            >
              <User2 size={20} /> Login as guest
            </button>

            {showError && <p className="text-red-700 font-sm">{showError}</p>}
          </div>

          <div className="w-[90%] mt-6 px-4 flex items-center justify-between">
            <div className="w-1/2 border border-gray-500/60"></div>
            <p className="text-gray-500/70 font-bold px-2">or</p>
            <div className="w-1/2 border border-gray-500/60"></div>
          </div>
          <button
            className="w-[90%] mt-8 bg-blue-800 py-2 rounded-2xl cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-blue-800 hover:text-blue-800 font-bold"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
