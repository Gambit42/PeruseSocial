import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleBurger } from "../../actions/index";
import { GiSunkenEye } from "react-icons/gi";
import styled, { css } from "styled-components";

const StyledUL = styled.ul`
  padding: 1.75rem;
  top: 5rem;
  position: absolute;
  height: 100%;
  width: 40%;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: start;
  align-items: center;
  transform: translateX(100%);
  transition: transform 0.5s ease-in;

  ${({ activeBurger }) =>
    activeBurger &&
    css`
      transform: translateX(0%);
    `}

  @media (min-width: 768px) {
    top: 0;
    transform: translateX(0%);
    flex-direction: row;
    position: unset;
    justify-content: center;
    align-items: center;
  }
`;

const BurgerLines = css`
  width: 30px;
  height: 4px;
  background-color: #111;
  margin: 3px;
  transition: all 0.3s ease;
  z-index: 1000;
`;

const FirstBurgerLine = styled.div`
  ${BurgerLines}
  ${({ activeBurger }) =>
    activeBurger &&
    css`
      transform: rotate(-47deg) translate(-6px, 7px);
    `}
`;

const SecondBurgerLine = styled.div`
  ${BurgerLines}
  ${({ activeBurger }) =>
    activeBurger &&
    css`
      opacity: 0;
    `}
`;

const ThirdBurgerLine = styled.div`
  ${BurgerLines}
  ${({ activeBurger }) =>
    activeBurger &&
    css`
      transform: rotate(47deg) translate(-6px, -7px);
    `}
`;

const LandingPage = () => {
  const isBurgerOpen = useSelector((state) => state.isBurgerOpen);
  const dispatch = useDispatch();
  const handleToggleBurger = () => {
    dispatch(toggleBurger());
  };

  return (
    <nav className="fixed w-screen h-16 flex justify-between shadow-xl">
      <div className="px-6 md:px-10 flex items-center">
        <GiSunkenEye className="h-10 w-10 mr-3 sm:h-12 sm:w-12 fill-current text-green-500" />
        <p className="text-xl font-bold sm:text-3xl font-sans">Peruse</p>
      </div>
      <div className="flex pr-4 md:pr-10 justify-end">
        <StyledUL activeBurger={isBurgerOpen ? true : false}>
          <li className="m-5">
            <a href="/" className="text-base font-sans">
              Home
            </a>
          </li>
          <li className="m-5">
            <a href="/" className="text-base font-sans">
              Reviews
            </a>
          </li>
          <li
            className="m-5 md:hidden"
            onClick={() => {
              dispatch(toggleBurger());
            }}
          >
            <Link to="/login" className="text-base font-sans">
              Sign-in
            </Link>
          </li>
        </StyledUL>
        <div className="ml-4 px-2 flex flex-col justify-center">
          <Link
            className="hidden sm:block py-2 px-4 text-base font-sans hover:bg-green-300 bg-green-400 transition duration-300 ease-in-out"
            to="/login"
            style={{
              display: isBurgerOpen ? "none" : "",
            }}
          >
            Sign-in
          </Link>
        </div>
        <div
          className="md:hidden flex flex-col justify-center cursor-pointer"
          onClick={handleToggleBurger}
        >
          <FirstBurgerLine activeBurger={isBurgerOpen ? true : false} />
          <SecondBurgerLine activeBurger={isBurgerOpen ? true : false} />
          <ThirdBurgerLine activeBurger={isBurgerOpen ? true : false} />
        </div>
      </div>
    </nav>
  );
};

export default LandingPage;
