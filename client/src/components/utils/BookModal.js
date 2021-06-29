import React, { useState, useEffect } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import { formatDistance } from "date-fns";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  &:before {
    width: 100%;
    height: 100%;
    content: "";
    background: #111;
    opacity: 0.7;
    position: fixed;
    z-index: 40;
  }
`;

const StyledImage = styled.img`
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 400px;
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

const StyledP = styled.p`
  color: #111;
  font-size: 0.8rem;
  font-family: "Karla", sans-serif;
  font-weight: 400;
`;

const StyledH1 = styled.h1`
  color: #111;
  font-size: 1rem;
  font-family: "Karla", sans-serif;
  font-weight: 700;
`;

const BookModal = ({ history, match }) => {
  const location = useLocation();
  const userID = useSelector((state) => state.userID);
  const visitedUserID = useSelector((state) => state.visitedUserID);
  const [usersMatch, setUsersMatch] = useState(false);
  const [bookDetail, setBookDetail] = useState({
    bookImage: "",
    bookThoughts: "",
    bookTitle: "",
    dateCreated: "",
  });

  const handleModalClose = (e) => {
    e.preventDefault();
    history.push(location.state.background.pathname);
  };

  useEffect(() => {
    const config = {
      method: ["GET"],
      header: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(
        `http://localhost:4000/book/thought/${match.params.thoughtID}`,
        config
      )
      .then((res) => {
        const date = new Date(res.data.data.books[0].dateCreated);
        const dateThoughtCreated = formatDistance(date, Date.now());
        const bookImage = res.data.data.books[0].bookImage;
        const bookTitle = res.data.data.books[0].bookTitle;
        const bookThoughts = res.data.data.books[0].bookThoughts;

        setBookDetail({
          bookImage: bookImage,
          bookTitle: bookTitle,
          bookThoughts: bookThoughts,
          dateCreated: dateThoughtCreated,
        });
        if (userID === visitedUserID) {
          setUsersMatch(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <StyledModal>
      <div className="flex flex-col fixed w-full h-full border z-50 bg-white sm:w-4/6 sm:h-5/6 sm:rounded-t-lg sm:rounded-bl-lg md:w-3/6 lg:w-2/6">
        <div className="px-2 flex flex-row items-center sm:rounded-t-lg mb-4 mt-2">
          <ImArrowLeft2
            className="cursor-pointer w-10 h-10 px-2 py-2 mr-2 rounded-full hover:bg-green-200 hover:text-green-600 text-green-500 transition duration-300 ease-in-out"
            onClick={handleModalClose}
          />
          <StyledH1 className="font-sans text-xl font-bold">Thought</StyledH1>
        </div>
        <div className="h-full overflow-y-auto flex flex-col items-center justify-between">
          <StyledImage
            className="w-full"
            src={`/assets/uploads/images/${bookDetail.bookImage}`}
          />
          <div className="px-2 py-2 flex items-center w-full border">
            <StyledH1 className="pr-1 font-bold">Title:</StyledH1>
            <StyledP>{bookDetail.bookTitle}</StyledP>
          </div>
          <div className="py-2 flex flex-col w-full border flex-grow">
            <StyledH1 className="px-2 font-bold">Thoughts:</StyledH1>
            <StyledP className="mx-2 px-2 py-1 flex-grow bg-gray-100 rounded-lg">
              {bookDetail.bookThoughts}
            </StyledP>
          </div>
        </div>
        <div className="w-full py-2 px-2 flex flex-row justify-between items-center">
          <StyledP>{`Posted ${bookDetail.dateCreated} ago`}</StyledP>
          <StyledDeleteDiv isDelete={usersMatch}>
            <FaTrashAlt />
            <StyledP className="pl-1 ">Delete</StyledP>
          </StyledDeleteDiv>
        </div>
      </div>
    </StyledModal>
  );
};

export default BookModal;
