import React from "react";

function LoginForm({login,setLogin,error}) {
  function change(event){
    setLogin({...login,[event.target.name]:event.target.value});
  }
  return (
    <div className="flex flex-col py-3 gap-3 mb-0">
      <input
        id='userid'
        type="text"
        name="userId"
        placeholder="User ID"
        value={login.userId}
        onChange={change}
        className={`border-2 p-3 rounded-md w-full focus:border-yellow-400 outline-none ${error.userIdError ? "border-red-600" : "border-slate-200"}`}
      />
      {error.userIdError && <div className="text-[10px] text-red-600">Incorrect UserID</div>}
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        value={login.password}
        onChange={change}
        className={`border-2 p-3 rounded-md w-full focus:border-yellow-400 outline-none ${error.passwordError ? "border-red-600" : "border-slate-200"}`}
      />
      {error.passwordError && <div className="text-[10px] text-red-600">Incorrect Password</div>}
    </div>
  );
}

export default LoginForm;
