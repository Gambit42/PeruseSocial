import React, { useState } from "react";
import onlineConnectionSVG from "../.././assets/svg/onlineConnection.svg";
import { GiSunkenEye } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StyledDiv = styled.div`
  height: 90%;
`;

const RegisterPage = ({ history }) => {
  const [registerInput, setRegisterInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    errorUsername: "",
    errorEmail: "",
    errorPassword: "",
  });

  const handleRegisterInput = (e) => {
    const targetValue = e.target.value;
    const targetID = e.target.id;

    if (targetID === "username") {
      setRegisterInput({ ...registerInput, userName: targetValue });
    } else if (targetID === "email") {
      setRegisterInput({ ...registerInput, email: targetValue });
    } else if (targetID === "password") {
      setRegisterInput({ ...registerInput, password: targetValue });
    } else if (targetID === "confirmPassword") {
      setRegisterInput({ ...registerInput, confirmPassword: targetValue });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const userRegistrationData = {
      userName: registerInput.userName,
      email: registerInput.email,
      password: registerInput.password,
    };

    if (registerInput.password !== registerInput.confirmPassword) {
      setRegisterInput({ ...registerInput, password: "", confirmPassword: "" });
      setTimeout(() => {
        setError({ ...error, errorPassword: "" });
      }, 5000);
      return setError({
        ...error,
        errorPassword: "Password fields does not match.",
      });
    }

    axios
      .post("http://localhost:4000/api/auth/register", userRegistrationData)
      .then((res) => {
        console.log(res.data);
        alert("successfully registered.");
        history.push("/");
      })
      .catch((error) => {
        const errorUsername = error.response.data.error.userName;
        const errorEmail = error.response.data.error.email;
        setError({
          ...error,
          errorUsername: errorUsername,
          errorEmail: errorEmail,
        });
        setTimeout(() => {
          setError("");
        }, 5000);
        console.log(error.response.data.error);
      });
  };

  return (
    <div className="flex flex-row w-screen h-full justify-center items-center bg-gradient-to-r from-green-200 via-green-100 to-green-50 lg:bg-none">
      <StyledDiv className="my-5 border w-4/5 bg-white  shadow-2xl rounded-lg flex flex-col lg:ml-10 lg:mt-10 lg:w-3/6 lg:shadow-2xl lg:border-gray-700 lg:border-opacity-30">
        <div className="h-14 px-6 pt-2 md:px-10 flex items-center">
          <GiSunkenEye className="h-10 w-10 mr-2 sm:h-12 sm:w-12 fill-current text-green-500" />
          <p className="text-xl font-bold sm:text-3xl font-sans">Peruse</p>
        </div>
        <div className="pt-3 pb-6 h-full flex flex-col items-center lg:pt-3">
          <p className="text-lg text-green-500 font-bold">
            A whole new world is waiting.
          </p>
          <p className="text-sm text-gray-900 italic">Sign up for Peruse</p>
          <form
            onSubmit={handleRegister}
            className="bg-white rounded w-4/6 pt-6 lg:pt-4 md:w-3/6 lg:w-5/6"
          >
            <div className="mb-2">
              <label
                htmlFor="username"
                className="font-semibold text-md text-gray-900 pb-1 block"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={registerInput.userName}
                onChange={handleRegisterInput}
              />
            </div>
            <p className="text-left pl-1 py-1 w-4/6 text-sm italic text-red-500">
              {error.errorUsername}
            </p>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="font-semibold text-md text-gray-900 pb-1 block"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={registerInput.email}
                onChange={handleRegisterInput}
              />
            </div>
            <p className="text-left pl-1 py-1 w-4/6 text-sm italic text-red-500">
              {error.errorEmail}
            </p>
            <div className="w-full lg:flex lg:flex-row">
              <div className="mb-2 w-full lg:mb-0 lg:w-1/2 lg:mr-4">
                <label
                  htmlFor="password"
                  className="font-semibold text-md text-gray-900 pb-1 block"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={registerInput.password}
                  onChange={handleRegisterInput}
                />
              </div>
              <div className="w-full lg:w-1/2 ">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-md text-gray-900 pb-1 block"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={registerInput.confirmPassword}
                  onChange={handleRegisterInput}
                />
              </div>
            </div>
            <p className="text-left pl-1 py-1 w-4/6 text-sm italic text-red-500">
              {error.errorPassword}
            </p>
            <div className="mb-6 mt-3 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-400 rounded-full hover:bg-green-300 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </StyledDiv>
      <img
        src={onlineConnectionSVG}
        alt=""
        className="ml-14 mr-10 mt-5 hidden lg:w-1/2  lg:h-full lg:block"
      />
    </div>
  );
};

export default RegisterPage;
