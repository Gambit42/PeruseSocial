import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ImArrowLeft2 } from "react-icons/im";

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
  height: 200px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProfileModal = ({
  history,
  currentUserData,
  userDataChanges,
  setUserDataChanges,
}) => {
  const location = useLocation();
  const [previewSource, setPreviewSource] = useState();

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleEditProfileClose = () => {
    setUserDataChanges({
      ...userDataChanges,
      userName: currentUserData.userName,
    });
    history.push(location.state.background.pathname);
  };

  const handleUserChanges = (e) => {
    const targetValue = e.target.value;
    const targetID = e.target.id;
    if (targetID === "userName") {
      setUserDataChanges({ ...userDataChanges, userName: targetValue });
    } else if (targetID === "image") {
      const targetFile = e.target.files[0];
      if (targetFile && targetFile.type.substr(0, 5) === "image") {
        handlePreview(targetFile);
        setUserDataChanges({ ...userDataChanges, image: targetFile });
      } else {
        setUserDataChanges({ ...userDataChanges, image: null });
      }
      console.log(targetFile);
    }
  };

  const handleChangesUpdate = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", userDataChanges.image);
    formData.append("userName", userDataChanges.userName);

    const config = {
      method: ["PUT"],
      header: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .put("http://localhost:4000/user/update", formData, config)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <StyledModal>
      <div className="w-full h-full fixed border z-50 bg-white sm:w-4/6 sm:rounded-2xl sm:h-5/6 md:w-3/6 lg:w-2/6">
        <div className="border-b-2 border-gray-400 py-3 px-2 flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center">
            <ImArrowLeft2
              className="cursor-pointer w-10 h-10 px-2 py-2 mr-3 rounded-full hover:bg-green-200 hover:text-green-600 text-green-500 transition duration-300 ease-in-out"
              onClick={handleEditProfileClose}
            />
            <p className="font-sans text-xl font-bold">Edit profile</p>
          </div>
        </div>
        <div className="pt-2 px-5">
          <form
            onSubmit={handleChangesUpdate}
            className="bg-white rounded pt-6 pb-14 flex flex-col lg:pt-2 "
            encType="multipart/form-data"
          >
            <div className="w-full flex justify-center items-center pb-7">
              <label className="rounded-full shadow-lg" htmlFor="image">
                {previewSource ? (
                  <StyledImage src={previewSource} alt="chosen" />
                ) : (
                  <StyledImage
                    src={`/assets/uploads/images/${currentUserData.image}`}
                    alt="chosen"
                  />
                )}
              </label>
            </div>
            <div className="mb-4 flex justify-center items-center">
              <div className="border border-gray-400 flex flex-col w-full h-full shadow-lg hover:border-gray-600">
                <label
                  className="pt-2 px-3 text-sm text-gray-500 w-full"
                  htmlFor="userName"
                >
                  Username
                </label>
                <input
                  className="px-3 pb-1 text-black outline-none bg-white"
                  id="userName"
                  type="text"
                  value={userDataChanges.userName}
                  onChange={handleUserChanges}
                />
              </div>
            </div>
            <p className="text-left pl-1 py-1 w-4/6 text-sm italic text-red-500"></p>
            <div className="w-full justify-center mb-2 border border-red-900 hidden">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleUserChanges}
              />
            </div>
            <button
              className="px-4 py-1 font-bold text-white bg-green-400 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline "
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </StyledModal>
  );
};

export default ProfileModal;
