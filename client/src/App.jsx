import { useEffect, useRef, useState } from "react";
import AnalyzerForm from "./pages/AnalyzerForm";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/authSlice";

function App() {
  const sideBarRef = useRef();
  const { authUser } = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
 

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideBarRef.current && !sideBarRef.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="relative">
      
      <Routes>
        <Route
          path="/"
          element={
            <AnalyzerForm
              sideBarRef={sideBarRef}
              showMenu={showMenu}
              toggleMenu={toggleMenu}
            />
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/results/:id" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
