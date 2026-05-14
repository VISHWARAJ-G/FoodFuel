import React, { useState, useEffect } from "react";
import SignupForm from "./SignupForm";
import "./Form.css";

function Signup() {
  const [signup, setSignup] = useState({
    name: "",
    type: "",
    email: "",
    number: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [signupError, setSignupError] = useState({
    name: false,
    type: false,
    email: false,
    number: false,
    address: false,
    district: false,
    state: false,
    pincode: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [signupError]);
  
  async function signingup(event) {
    event.preventDefault();
  
    const entryerror = {
      name: !signup.name,
      type: !signup.type,
      email: !signup.email,
      number: !signup.number,
      address: !signup.address,
      district: !signup.district,
      state: !signup.state,
      pincode: !signup.pincode,
    };
  
    setSignupError(entryerror);
    setFormSubmitted(true); 
  
    if (Object.values(entryerror).includes(true)) {
      return;
    }
  
    console.log("Sending Signup Data:", signup);
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.status === 200) {
        alert("Signup Successful!");
      } else {
        alert("Signup Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }
  }
  return (
    <div className="p-3.5 h-full bg-white">
      <h1 className="font-bold  text-center text-xl" id="Signup-text">
        Signup Form
      </h1>
      <form action="#" onSubmit={signingup}>
        <SignupForm signup={signup} setSignup={setSignup} signupError={signupError}/>
        <button className="w-full bg-gradient-to-r to-blue-950 from-blue-600 text-white p-3 rounded-xl hover:from-blue-950 hover:to-blue-600">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
