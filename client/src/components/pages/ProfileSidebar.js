import React from "react";
import styled, { css } from "styled-components";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
  width: 100%;
  display: none;
  justify-content: flex-end;
  margin-top: 2rem;
  color: white;

  ${({ isEdit }) =>
    isEdit &&
    css`
      display: flex;
    `}
`;

const StyledP = styled.p`
  font-size: 0.8rem;
  font-family: "Karla", sans-serif;
  font-weight: 400;
`;

const StyledH1 = styled.h1`
  font-size: 1rem;
  font-family: "Karla", sans-serif;
  font-weight: 700;
`;

const ProfileSidebar = ({ userProfileData }) => {
  const userID = useSelector((state) => state.userID);
  const visitedUserID = useSelector((state) => state.visitedUserID);

  return (
    <div className="flex w-full pt-16 px-2 pb-4 border-r-2 justify-center items-center bg-white">
      <div className="flex flex-col justify-start items-start px-6 bg-white sm:flex-row sm:justify-center sm:items-center">
        <div className="rounded-lg sm:px-2 mr-4 cursor-pointer transition duration-300 ease-in-out ">
          <img
            className="inline-block h-32 w-32 rounded-full bg-white"
            src={
              userProfileData.image
                ? `/assets/uploads/images/${userProfileData.image}`
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F4b%2F4beebce89d681837ba2f4105ce43afac.png&f=1&nofb=1"
            }
            alt=""
          />
        </div>
        <div className="flex flex-col w-full py-6 sm:w-3/6 sm:py-8">
          <div className="flex flex-col justify-start items-start">
            <StyledP className="text-gray-500">Username:</StyledP>
            <StyledH1 className="">{userProfileData.userName}</StyledH1>
          </div>
          <div className="flex flex-col justify-start items-start">
            <StyledP className="text-gray-500">Posts:</StyledP>
            <StyledH1 className="">
              {userProfileData.books.length > 0
                ? `${userProfileData.books.length} posts`
                : "No posts yet"}
            </StyledH1>
          </div>
          <div className="flex flex-col justify-start items-start">
            <StyledP className="text-gray-500">Status:</StyledP>
            <StyledP className="bg-white rounded-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </StyledP>
          </div>
          <StyledDiv isEdit={userID === visitedUserID ? true : false}>
            <button
              className="bg-green-500 flex justify-between items-center flex-row rounded-full px-4 py-1 mr-3 hover:bg-green-400 focus:outline-none focus:shadow-outline font-bold"
              onClick={() => {
                console.log(visitedUserID);
                console.log(userID);
              }}
            >
              <FaEdit />
              <p className="ml-2">Edit</p>
            </button>
          </StyledDiv>
        </div>
      </div>

      {/* <div className="flex flex-col">
        <div className="w-full  flex flex-row justify-start items-center rounded-lg py-2 px-2 mr-4 cursor-pointer transition duration-300 ease-in-out ">
          <img
            className="inline-block h-20 w-20 rounded-full bg-white mr-2 "
            src={
              userProfileData.image
                ? `/assets/uploads/images/${userProfileData.image}`
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F4b%2F4beebce89d681837ba2f4105ce43afac.png&f=1&nofb=1"
            }
            alt=""
          />
          <div className="flex flex-col">
            <StyledP className="text-gray-500">Username:</StyledP>
            <StyledH1 className="">{userProfileData.userName}</StyledH1>
          </div>
        </div>
        <div className="flex flex-col py-2 px-2 justify-start bg-gray-900 ">
          <StyledP className=" text-gray-500 mb-1">Status:</StyledP>
          <StyledP className="bg-gray-100 mx-2 px-3 py-1 font-bold rounded-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
            saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </StyledP>
        </div>
      </div> */}

      {/*       
        <div>
          <div className="flex flex-col py-2 px-2">
            <StyledP className=" text-gray-500 mb-1">Status:</StyledP>
            <StyledP className="bg-gray-100 mx-2 px-3 py-1 h-40 font-bold rounded-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam quae, pariatur assumenda ullam repellendus beatae in
              sequi, amet excepturi quis odit! Aliquam, ut sint cupiditate
              magnam dolorem soluta maiores error?
            </StyledP>
          </div>
          <StyledDiv isEdit={userID === visitedUserID ? true : false}>
            <button
              className="bg-green-500 flex justify-between items-center flex-row rounded-full px-4 py-1 mr-3 hover:bg-green-400 focus:outline-none focus:shadow-outline font-bold"
              onClick={() => {
                console.log(visitedUserID);
                console.log(userID);
              }}
            >
              <FaEdit />
              <p className="ml-2">Edit</p>
            </button>
          </StyledDiv>
        </div> */}
    </div>
  );
};

export default ProfileSidebar;
