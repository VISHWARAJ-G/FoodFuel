import React, { useState } from "react";
import LoginForm from "./LoginForm";
import './Form.css'

function Login({ setActive }) {
  const [login, setLogin] = useState({
    userId: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [error,setError] = useState({
    userIdError:false,
    passwordError:false
  })
  async function validation(event) {
    event.preventDefault();
    let newErrors = {
      userIdError: !login.userId,  // True if userId is empty
      passwordError: !login.password  // True if password is empty
    };

    setError(newErrors);
    if (newErrors.userIdError || newErrors.passwordError) {
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Login Successful!");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Server error. Please try again later.");
    }
  }
  return (
    <>
      <div className="p-5">
        <h1 className="font-bold font-serif text-center text-xl" id="login-text">Login Form</h1>
        <form action="#" onSubmit={validation}>
          <LoginForm login={login} setLogin={setLogin} error={error}/>
          <a href="/forgot" className="text-blue-900 mt-0">
            Forgot Password ?
          </a>
          <button className="w-full bg-gradient-to-r to-blue-950 from-blue-600 text-white p-3 rounded-xl mt-5 hover:from-blue-950 hover:to-blue-600">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
