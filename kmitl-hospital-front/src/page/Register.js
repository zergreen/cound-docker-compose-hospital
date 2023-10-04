import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../function/AuthApi';

const Register = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    register(username, password, role, navigate);
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-1/3 h-2/3 bg-white shadow-2xl rounded-lg flex justify-center items-center ">
        <div className="w-2/3 h-2/3 p-4 ">
          <h2 className="text-3xl my-2.5">คุณพร้อมหรือยัง</h2>
          <h1 className="text-5xl leading-6 my-2.5 pb-4">ลงทะเบียน</h1>

          <form onSubmit={handleLogin}>
            <div className="my-5">
              <p className=" font-normal font-400 text-base leading-5 text-gray-700 pb-2">
                Username
              </p>
              <input
                className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2"
                type="text"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                pattern="[A-Za-z0-9]{4,}"
                required
              />
              <p className=" font-normal font-400 text-base leading-5 text-gray-700 pb-2">
                Role
              </p>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2">
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
                <option value='doctor'>Doctor</option>
              </select>
              {/* <input
                className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                // required
              /> */}
            </div>
            <div className="my-5">
              <p className=" font-normal font-400 text-base leading-5 text-gray-700 pb-2">
                Password
              </p>
              <label style={{color: 'red'}}>Ex:Aa@123456</label>
              <input
                className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              
            </div>
            <button
              className="bg-orange-500 rounded-lg  font-bold font-700 text-lg leading-6 text-white w-full h-12"
              type="submit"
            >
              เข้าสู่ระบบ
            </button>
        <a href="/">หากคุณมีบัญชีแล้ว? [click]</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
