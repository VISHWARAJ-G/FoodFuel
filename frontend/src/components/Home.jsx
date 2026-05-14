import React from "react";
import logo from "./logoFood.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-950 to-blue-900 p-4 flex justify-between items-center">
      <div>
        <img src={logo} alt="Food Logo" className="h-10 w-40" />
      </div>
      <div className="flex w-[30%] justify-between text-white font-semibold items-center">
        {/* Fixed Navigation Links */}
        <Link to="/home">My Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link
          to="/login-signup"
          className="bg-emerald-300 px-4 py-2 rounded-md"
        >
          Login / Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
