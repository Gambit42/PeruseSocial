import React, { useState } from "react";
import readingSVG from "../.././assets/svg/reading.svg";
import { GiSunkenEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../actions/index";

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  const [loginInput, setLoginInput] = useState({
    usernameEmail: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLoginInput = (e) => {
    const targetValue = e.target.value;
    const targetID = e.target.id;

    if (targetID === "usernameEmail") {
      setLoginInput({ ...loginInput, usernameEmail: targetValue });
    } else if (targetID === "password") {
      setLoginInput({ ...loginInput, password: targetValue });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const config = {
      method: ["POST"],
      header: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    };

    const userLoginData = {
      userName: loginInput.usernameEmail,
      email: loginInput.usernameEmail,
      password: loginInput.password,
    };

    axios
      .post("http://localhost:4000/api/auth/login", userLoginData, config)
      .then((res) => {
        console.log(res.data);
        dispatch(login());
        history.push("/home");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  return (
    <div className="flex flex-row-reverse w-screen h-screen justify-center items-center bg-gradient-to-r from-green-200 via-green-100 to-green-50 lg:bg-none ">
      <div className="border w-4/5 bg-white  shadow-2xl rounded-lg flex flex-col lg:w-2/6  lg:shadow-2xl lg:border-gray-700 lg:border-opacity-30">
        <div className="h-14 px-6 pt-2 md:px-10 flex items-center">
          <GiSunkenEye className="h-10 w-10 mr-2 sm:h-12 sm:w-12 fill-current text-green-500" />
          <p className="text-xl font-bold sm:text-3xl font-sans">Peruse</p>
        </div>
        <div className="pt-3 h-full flex flex-col items-center lg:pt-6">
          <p className="text-lg text-green-500 font-bold">
            Discover a new world.
          </p>
          <p className="text-sm text-gray-900 italic">Sign in to Peruse</p>
          <form
            onSubmit={handleLogin}
            className="bg-white rounded pt-6 pb-14 flex flex-col lg:pt-8 "
          >
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="usernameEmail"
                type="text"
                placeholder="Username or email"
                value={loginInput.usernameEmail}
                onChange={handleLoginInput}
              />
            </div>
            <div className="mb-2">
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                value={loginInput.password}
                onChange={handleLoginInput}
              />
            </div>
            <p className="text-left pl-1 py-1 w-4/6 text-sm italic text-red-500">
              {error}
            </p>
            <div className="mb-4">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="checkbox_id"
              />
              <label className="text-sm" htmlFor="checkbox_id">
                Remember Me
              </label>
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-green-300 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/register"
              >
                Create an Account.
              </Link>
            </div>
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 "
                href="./forgot-password.html"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
      <img
        src={readingSVG}
        alt=""
        className="hidden lg:w-1/2  lg:h-full lg:block"
      />
    </div>
  );
};

export default LoginPage;
