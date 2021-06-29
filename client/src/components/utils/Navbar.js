import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiSunkenEye } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { HiOutlineMenu } from "react-icons/hi";
import { FaSearch, FaEdit } from "react-icons/fa";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { logout, toggleMenu } from "../../actions/index";

const StyledMenu = styled.div`
  position: absolute;
  display: none;
  top: 3.4rem;
  right: 1rem;
  background-color: #fff;
  min-width: 40%;
  padding: 8px 14px;
  border: 1px solid rgba(71, 71, 71, 0.2);

  ${({ activeMenu }) =>
    activeMenu &&
    css`
      display: block;
    `}

  @media(min-width: 640px) {
    min-width: 20%;
  }

  @media (min-width: 1024px) {
    min-width: 20%;
  }
`;

const StyledP = styled.p`
  font-size: 0.7rem;
  font-family: "Karla", sans-serif;
  font-weight: 400;
`;

const StyledH1 = styled.h1`
  font-size: 0.8rem;
  font-family: "Karla", sans-serif;
  font-weight: 700;
`;

const Navbar = ({ currentUserData }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.isMenuOpen);
  const [searchInput, setSearchInput] = useState("");

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const config = {
      method: ["GET"],
      header: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/private/endSession", config)
      .then((res) => {
        dispatch(logout());
      });
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    const targetValue = e.target.value;
    setSearchInput(targetValue);
    // if (e.code === "Enter" || e.code === "NumpadEnter") {
    //   console.log("Hello");
    // }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
    history.push(`${searchInput}`);
    setSearchInput("");
  };
  return (
    <nav className="fixed w-full h-14 flex shadow-sm justify-between border border-bt z-20 bg-white">
      <div className="mx-3 flex items-center">
        <div
          className="h-10 w-10 mr-2 rounded-full flex justify-center items-center bg-green-500 cursor-pointer"
          onClick={() => {
            history.push("/");
          }}
        >
          <GiSunkenEye className="text-white w-4/5 h-4/5 rounded-full" />
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="h-10 w-56 hidden relative sm:flex flex-row justify-center items-center rounded-full bg-gray-100"
        >
          <div className="text-green-500 absolute left-3 focus:outline-none">
            <FaSearch className="h-3/5 w-5" />
          </div>
          <input
            className="h-10 pl-12 pr-4 rounded-full text-sm focus:outline-none bg-transparent"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInput}
          />
        </form>
      </div>
      <div className="flex md:pr-10 justify-end items-center lg:pr-6 ">
        <div className="px-2 transition duration-300 ease-in-out h-full flex -space-x-1 overflow-hidden items-center ">
          <Link
            className="hidden hover:bg-gray-100 sm:flex flex-row justify-center items-center rounded-full py-2 px-2 mr-4 cursor-pointer transition duration-300 ease-in-out"
            to={`${currentUserData.userName}`}
          >
            <img
              className="inline-block h-6 w-6 rounded-full bg-white mr-2 "
              src={
                currentUserData.image
                  ? `/assets/uploads/images/${currentUserData.image}`
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F4b%2F4beebce89d681837ba2f4105ce43afac.png&f=1&nofb=1"
              }
              alt=""
            />
            <StyledH1>{currentUserData.userName}</StyledH1>
          </Link>
          <div className="flex flex-row justify-center items-center">
            {/* <Link
              to={{
                pathname: `/compose/entry`,
                state: { background: location },
              }}
              className="h-10 w-10 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer mr-2 transition duration-300 ease-in-out"
            >
              <BiBookAdd className="text-black h-3/5 w-3/5 rounded-full" />
            </Link> */}
            <div className="h-10 w-10 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 cursor-pointer mr-2 transition duration-300 ease-in-out sm:hidden">
              <HiOutlineMenu className="text-black h-3/5 w-3/5 rounded-full" />
            </div>
            <div
              className="h-10 w-10 rounded-full flex justify-center items-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={handleToggleMenu}
            >
              <BsFillCaretDownFill className="text-black h-2/5 w-2/5 rounded-full" />
            </div>
          </div>
          <StyledMenu
            activeMenu={isMenuOpen ? true : false}
            className="shadow-md rounded-md"
          >
            <Link
              className="w-full hover:bg-gray-100 flex flex-row justify-start items-center rounded-lg py-2 px-2 mr-4 cursor-pointer transition duration-300 ease-in-out"
              onClick={handleToggleMenu}
              to={`${currentUserData.userName}`}
            >
              <img
                className="inline-block h-10 w-10 rounded-full bg-white mr-2 "
                src={
                  currentUserData.image
                    ? `/assets/uploads/images/${currentUserData.image}`
                    : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F4b%2F4beebce89d681837ba2f4105ce43afac.png&f=1&nofb=1"
                }
                alt=""
              />
              <div className="flex flex-col">
                <StyledH1 className="text-base font-bold">
                  {currentUserData.userName}
                </StyledH1>
                <StyledP className="text-xs text-gray-500">
                  See your profile
                </StyledP>
              </div>
            </Link>
            <ul className="w-full flex flex-col justify-center">
              <Link
                className="flex flex-row items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 py-2 px-2 rounded-lg"
                onClick={handleToggleMenu}
                to={"/"}
              >
                <AiFillHome className="bg-gray-200 w-8 h-8 px-2 py-2 rounded-full" />

                <p className="text-gray-700 block px-2 text-sm font-sans cursor-pointer">
                  Home
                </p>
              </Link>
              <Link
                className="flex flex-row items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 py-2 px-2 rounded-lg"
                onClick={handleToggleMenu}
                to={{
                  pathname: `/settings/edit`,
                  state: { background: location },
                }}
              >
                <FaEdit className="bg-gray-200 w-8 h-8 px-2 py-2 rounded-full" />
                <p className="text-gray-700 block px-2 text-sm font-sans cursor-pointer">
                  Edit Profile
                </p>
              </Link>
              <li
                className="flex flex-row items-center cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 py-2 px-2 rounded-lg"
                onClick={handleLogout}
              >
                <GoSignOut className="bg-gray-200 w-8 h-8 px-2 py-2 rounded-full" />
                <p className="text-gray-700 block px-2 text-sm font-sans cursor-pointer">
                  Log-Out
                </p>
              </li>
            </ul>
          </StyledMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
