import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LogDash from "./components/LogDash";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/login-signup" element={<LogDash />} /> {/* Login/Signup Page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
