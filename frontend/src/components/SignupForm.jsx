import React, { useState, useEffect } from "react";

function SignupForm({ signup, setSignup, signupError }) {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json"
    )
      .then((res) => res.json())
      .then((data) => setStates(data?.states || [])) // ✅ Handle undefined states gracefully
      .catch((err) => console.error("Error fetching states: ", err));
  }, []);

  function change(event) {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  }

  function handleStateChange(event) {
    const selectedState = event.target.value;
    setSignup({ ...signup, state: selectedState, district: "" });

    const selectedStateData = states.find((s) => s.state === selectedState);
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  }

  useEffect(() => {}, [signupError]);

  return (
    <div className="flex flex-col py-3 gap-3 mb-0">
      <input
        type="text"
        name="name"
        placeholder="Organization name"
        value={signup.name}
        onChange={change}
        className={`border-2 p-4 rounded-md w-full bg-white bg-opacity-35 focus:border-yellow-400 outline-none ${signupError.name ? "border-red-600" : "border-gray-300"}`}
      />
      {signupError.name && <div className="text-[10px] text-red-600">Incorrect Organization Name</div>}

      <select
        name="type"
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.type ? "border-red-600" : "border-gray-300"}`}
        onChange={change}
        value={signup.type}
      >
        <option value="" disabled>Select Type</option>
        <option value="NGO">NGO</option>
        <option value="donor">Donor</option>
      </select>
      {signupError.type && <div className="text-[10px] text-red-600">Incorrect Type</div>}

      <input
        type="email"
        name="email"
        placeholder="Email ID"
        value={signup.email}
        onChange={change}
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.email ? "border-red-600" : "border-gray-300"}`}
      />
      {signupError.email && <div className="text-[10px] text-red-600">Incorrect Email</div>}

      <input
        type="tel"
        name="number"
        placeholder="Phone No"
        value={signup.number}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,10}$/.test(value)) setSignup({ ...signup, number: value }); // ✅ Limits input to 10 digits
        }}
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.number ? "border-red-600" : "border-gray-300"}`}
      />
      {signupError.number && <div className="text-[10px] text-red-600">Incorrect Phone Number</div>}

      <textarea
        name="address"
        placeholder="Address"
        value={signup.address}
        onChange={change}
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.address ? "border-red-600" : "border-gray-300"}`}
      />
      {signupError.address && <div className="text-[10px] text-red-600">Incorrect Address</div>}

      <select
        name="state"
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.state ? "border-red-600" : "border-gray-300"}`}
        onChange={handleStateChange}
        value={signup.state}
      >
        <option value="" disabled>Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state.state}>{state.state}</option>
        ))}
      </select>
      {signupError.state && <div className="text-[10px] text-red-600">Incorrect State</div>}

      <select
        name="district"
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.district ? "border-red-600" : "border-gray-300"}`}
        onChange={change}
        value={signup.district}
        disabled={!signup.state}
      >
        <option value="" disabled>Select District</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>{district}</option>
        ))}
      </select>
      {signupError.district && <div className="text-[10px] text-red-600">Incorrect District</div>}

      <input
        type="number"
        name="pincode"
        placeholder="Pincode"
        value={signup.pincode}
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,6}$/.test(value)) setSignup({ ...signup, pincode: value }); // ✅ Limits input to 6-digit numbers
        }}
        className={`border-2 p-4 rounded-md w-full focus:border-yellow-400 outline-none ${signupError.pincode ? "border-red-600" : "border-gray-300"}`}
      />
      {signupError.pincode && <div className="text-[10px] text-red-600">Incorrect Pincode</div>}
    </div>
  );
}

export default SignupForm;
