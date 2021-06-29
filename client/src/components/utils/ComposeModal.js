import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ImArrowLeft2, ImPlus } from "react-icons/im";
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
  width: 200px;
  height: 260px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledPlaceholderImage = styled.div`
  width: 200px;
  height: 260px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover #ImPlus {
    color: white;
  }
`;

const ComposeModal = ({ history }) => {
  const location = useLocation();
  const [boookData, setBookData] = useState({
    bookImage: "",
    bookTitle: "",
    bookThoughts: "",
  });
  const [previewSource, setPreviewSource] = useState();

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleEditProfileClose = () => {
    history.push(location.state.background.pathname);
    // history.goBack();
  };

  const handleBookInput = (e) => {
    const targetValue = e.target.value;
    const targetID = e.target.id;
    if (targetID === "bookTitle") {
      setBookData({ ...boookData, bookTitle: targetValue });
    } else if (targetID === "bookThoughts") {
      setBookData({ ...boookData, bookThoughts: targetValue });
    } else if (targetID === "image") {
      const targetFile = e.target.files[0];
      if (targetFile && targetFile.type.substr(0, 5) === "image") {
        handlePreview(targetFile);
        setBookData({ ...boookData, bookImage: targetFile });
      } else {
        setBookData({ ...boookData, bookImage: null });
      }
      console.log(targetFile);
    }
  };

  const handleAddThoughts = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", boookData.bookImage);
    formData.append("bookTitle", boookData.bookTitle);
    formData.append("bookThoughts", boookData.bookThoughts);

    const config = {
      method: ["PUT"],
      header: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .put("http://localhost:4000/book/compose", formData, config)
      .then((res) => {
        console.log(res);
        setBookData({
          bookImage: "",
          bookTitle: "",
          bookThoughts: "",
        });
        setPreviewSource("");
        history.goBack();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <StyledModal onClick={handleEditProfileClose}>
      <div className="flex flex-col fixed w-full h-full border z-50 bg-white sm:w-4/6 sm:h-5/6 sm:rounded-t-lg sm:rounded-bl-lg md:w-3/6 lg:w-2/6">
        <div className="border-b-2 border-gray-400 py-3 px-2 flex flex-row justify-between items-center">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <ImArrowLeft2
                className="cursor-pointer w-10 h-10 px-2 py-2 mr-2 rounded-full hover:bg-green-200 hover:text-green-600 text-green-500 transition duration-300 ease-in-out"
                onClick={handleEditProfileClose}
              />
              <p className="font-sans text-xl font-bold">Compose Entry</p>
            </div>
            <button
              form="addThoughts"
              className="px-4 py-1 font-bold text-white bg-green-400 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline "
              type="submit"
            >
              Add Thoughts
            </button>
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll">
          <form
            id="addThoughts"
            onSubmit={handleAddThoughts}
            className="w-full h-full bg-white pt-6 sm:rounded-2xl lg:pt-5 "
            encType="multipart/form-data"
          >
            <div className="w-full flex justify-center items-center pb-7">
              <label className="shadow-lg" htmlFor="image">
                {previewSource ? (
                  <StyledImage src={previewSource} alt="chosen" />
                ) : (
                  <StyledPlaceholderImage className="border border-gray-400 flex justify-items-center items-center hover:bg-green-300 transition duration-300 ease-in-out">
                    <ImPlus
                      id="ImPlus"
                      className="cursor-pointer w-16 h-16 px-4 py-4   text-green-500"
                    />
                  </StyledPlaceholderImage>
                )}
              </label>
            </div>
            <div className="pb-6 mx-4 op flex justify-center items-center flex-col">
              <div className="mb-4 border border-gray-400 flex flex-col w-full h-full shadow-lg hover:border-gray-600">
                <label
                  className="pt-2 px-3 text-sm text-gray-500 w-full"
                  htmlFor="bookTitle"
                >
                  Title
                </label>
                <input
                  className="px-3 pb-1 text-black outline-none bg-white"
                  id="bookTitle"
                  type="text"
                  value={boookData.bookTitle}
                  onChange={handleBookInput}
                />
              </div>
              <div className="border border-gray-400 flex flex-col w-full h-full shadow-lg hover:border-gray-600">
                <label
                  className="pt-2 px-3 text-sm text-gray-500 w-full"
                  htmlFor="bookThoughts"
                >
                  Thoughts
                </label>
                <textarea
                  className="px-3 pb-1 text-black outline-none bg-white"
                  id="bookThoughts"
                  type="text"
                  value={boookData.bookThoughts}
                  onChange={handleBookInput}
                />
              </div>
            </div>
            <div className="w-full justify-center mb-2 border border-red-900 hidden">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleBookInput}
              />
            </div>
          </form>
        </div>
      </div>
    </StyledModal>
  );
};

export default ComposeModal;
