import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

function Password({value,onChange}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full ">
      <label htmlFor="email" className="w-full text-lg ml-2">
        Password:{" "}
      </label>
      <div className="bg-black rounded-2xl  border-b border-gray-600 relative flex overflow-hidden">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-[90%]  py-2 px-4 text-white/60 outline-none"
          placeholder="Enter password"
        />

        <div className="absolute right-3 flex items-center justify-center h-full" onClick={()=>setShowPassword(!showPassword)}>{!showPassword?<Eye/>:<EyeOff/>}</div>
      </div>
    </div>
  );
}

export default Password;
