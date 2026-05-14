import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function LogDash() {
  const [active, setActive] = useState("login");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setActive("signup");
    } else {
      setActive("login");
    }
  }, [location.pathname]);

  return (
    <div id="page">
      <div>Hello</div>
      <div className="bg-white px-7 py-5 w-1/3 rounded-3xl border-2 border-black bg-opacity-45">
        <div className="relative flex justify-around px-2 py-1 gap-3 bg-gray-200 rounded-2xl mb-3">
          <div
            className={`absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-blue-950 to-blue-600 rounded-2xl transition-all duration-500`}
            style={{ left: active === "login" ? "0%" : "50%" }}
          ></div>

          {/* Fixed Navigation Links */}
          <Link
            to="/login-signup/login"
            onClick={() => setActive("login")}
            className={`relative w-[50%] text-center p-3 rounded-2xl transition-all duration-500 ${
              active === "login" ? "text-white" : "text-black"
            }`}
          >
            Login
          </Link>
          <Link
            to="/login-signup/signup"
            onClick={() => setActive("signup")}
            className={`relative w-[50%] text-center p-3 rounded-2xl transition-all duration-500 ${
              active === "signup" ? "text-white" : "text-black"
            }`}
          >
            Signup
          </Link>
        </div>

        {/* Fixed Conditional Rendering Instead of Routes */}
        {active === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default LogDash;
