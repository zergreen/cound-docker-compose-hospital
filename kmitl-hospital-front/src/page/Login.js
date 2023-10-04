import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import he from "he";
import { login, autoLogin2 } from "../function/AuthApi";
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import './google-login-button.css'

const Login = () => {
  const [username, setUser1] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  async function testCall() {
    try {
      const response = await fetch(`http://database:3030/appoint`); // Assuming your Express API endpoint is /api/data
      if (response.ok) {
        
        const jsonData = await response.json();
        // setData(jsonData);
        console.log(jsonData);
      } else {
        console.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getProfile = () => {
    console.log(profile);
  };

  useEffect(() => {
    // case from 'self login'
    autoLogin2(navigate);

    // case from google-login
    if (user) {
      console.log("user_token: " + user.access_token);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("TOKEN", user.access_token);
          navigate('/home')
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();

    const sanitizedUsername = he.encode(username);
    const sanitizedPassword = he.encode(password);

    // call login api
    login(sanitizedUsername, sanitizedPassword, navigate);

    // if (sanitizedUsername === "qwerty" && sanitizedPassword === "qwerty") {
    //     navigate("/home");
    // } else {
    //     alert("Login fail");
    // }
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full sm:w-2/3 xl:w-1/3 min-w-[360px] h-auto bg-white shadow-2xl rounded-lg flex justify-center items-center py-16 ">
        <div className="w-2/3 h-2/3 p-4 ">
          <h2 className="text-3xl my-2.5">ยินดีต้อนรับ</h2>
          <h1 className="text-5xl leading-6 my-2.5 pb-4">เข้าสู่ระบบ</h1>

          <form onSubmit={handleLogin}>
            <div className="my-5">
              <p className=" font-normal font-400 text-base leading-5 text-gray-700 pb-2">
                Username
              </p>
              <input
                className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2"
                type="text"
                value={username}
                onChange={(e) => setUser1(e.target.value)}
                // required
              />
            </div>
            <div className="my-5">
              <p className=" font-normal font-400 text-base leading-5 text-gray-700 pb-2">
                Password
              </p>
              <input
                className="w-full bg-white shadow-lg rounded-lg outline-none border border-gray-300 p-2"
                type="password"
                value={password}
                pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g"
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
            </div>
            <button
              className="bg-orange-500 rounded-lg  font-bold font-700 text-lg leading-6 text-white w-full h-12"
              type="submit"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          <a href="/register">คุณยังไม่มีบัญชีใช่หรือไม่? [click]</a>
          {/* <center><br></br>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /></center> */}
          <div>
            {/* <br></br>
            <br></br>
            <h2>React Google Login</h2>
            <br />
            <br /> */}
            {profile ? (
              <div>
                <img src={profile.picture} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br />
                <button className='google-login-button' onClick={logOut}>Log out</button>
                {/* <button onClick={getProfile}>GetProfile</button> */}
              </div>
            ) : (
              <button className='google-login-button' onClick={() => googlelogin()}>Sign in with Google 🚀 </button>
              )}
              <button className='google-login-button' onClick={testCall}>Call Test</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
