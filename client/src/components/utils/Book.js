import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { formatDistance } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const StyledImage = styled.img`
  object-fit: cover;
  object-position: center top;
  width: 100%;
  height: 250px;
`;

const StyledP = styled.p`
  color: #111;
  font-size: 0.8rem;
  font-family: "Karla", sans-serif;
  font-weight: 400;
`;

const StyledH1 = styled.h1`
  color: #111;
  font-size: 0.9rem;
  font-family: "Karla", sans-serif;
  font-weight: 700;
`;

const StyledDeleteDiv = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  color: #dc2626;
  cursor: pointer;

  ${({ isDelete }) =>
    isDelete &&
    css`
      display: flex;
    `}
`;

const Book = ({ book, currentUser, visitedUser }) => {
  const userID = useSelector((state) => state.userID);
  const visitedUserID = useSelector((state) => state.visitedUserID);
  const [usersMatch, setUsersMatch] = useState(false);
  const location = useLocation();
  const date = new Date(book.dateCreated);
  const dateThoughtCreated = formatDistance(date, Date.now());

  const handleDeleteThought = (e) => {
    e.preventDefault();
    console.log(book._id);
    const config = {
      method: ["PUT"],
      header: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .put("http://localhost:4000/book/delete", { _id: book._id }, config)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (userID === visitedUserID) {
      setUsersMatch(true);
    }
  }, []);

  return (
    <Link
      className="w-5/6 h-full mt-10 mx-4 border bg-white shadow-lg sm:w-2/6 md:w-3/12 curs"
      to={{
        pathname: `/${visitedUser.userName}/thought/${book._id}`,
        state: { background: location },
      }}
    >
      <StyledImage
        className="w-full"
        src={`/assets/uploads/images/${book.bookImage}`}
      />
      <div className="flex justify-start items-center px-2 py-2 w-full border">
        <StyledH1 className="pr-1">Title:</StyledH1>
        <StyledP className="">{book.bookTitle}</StyledP>
      </div>
      <div className="h-1/6 py-2 flex flex-col justify-start  w-full border">
        <StyledH1 className="px-2 font-bold">Thoughts:</StyledH1>
        <StyledP className="mx-2 px-2 py-1 h-20 overflow-y-auto bg-gray-100 rounded-lg">
          {book.bookThoughts}
        </StyledP>
      </div>
      <div className="py-2 px-2 flex flex-row justify-between items-center">
        <StyledP>{`Posted ${dateThoughtCreated} ago`}</StyledP>
        <StyledDeleteDiv onClick={handleDeleteThought} isDelete={usersMatch}>
          <FaTrashAlt />
          <StyledP className="pl-1 ">Delete</StyledP>
        </StyledDeleteDiv>
      </div>
    </Link>
  );
};

export default Book;
