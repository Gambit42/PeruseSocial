import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../utils/Navbar";
import Book from "../utils/Book";
import ProfileSidebar from "./ProfileSidebar";
import styled from "styled-components";
import ComposeEntry from "../utils/ComposeEntry";
import { getVisitedUserID } from "../../actions/index";

const StyledDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
`;

const ProfilePage = ({ match, currentUserData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [userDataChanges, setUserDataChanges] = useState({
    userName: "",
    image: "",
  });

  const [userProfileData, setUserProfileData] = useState({
    userName: "",
    email: "",
    image: "",
    book: [{}],
  });

  useEffect(() => {
    let mounted = true;
    const config = {
      method: ["GET"],
      header: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/user/${match.params.userName}`, config)
      .then((res) => {
        dispatch(getVisitedUserID(res.data.user._id));
        console.log(res.data.user);
        const userName = res.data.user.userName;
        const email = res.data.user.email;
        const image = res.data.user.image;
        const books = res.data.user.books;
        const sortedBooks = books.sort((a, b) => {
          let da = new Date(a.dateCreated);
          let db = new Date(b.dateCreated);
          return db - da;
        });

        if (mounted) {
          setUserDataChanges({ ...userDataChanges, userName: userName });
          setUserProfileData({
            books: sortedBooks,
            userName: userName,
            email: email,
            image: image,
          });

          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/404/notfound");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [location, history, match.params.userName]);

  return (
    <div>
      {!loading ? (
        <StyledDiv>
          <Navbar currentUserData={currentUserData} match={match} />
          <ProfileSidebar userProfileData={userProfileData} />
          <div className="py-12 w-full h-full flex flex-col justify-center items-center sm:justify-center sm:flex-wrap sm:flex-row sm:items-start md:justify-start md:mx-24">
            {userProfileData.books.length === 0 ? (
              <p className="pt-8 italic">No book thoughts yet.</p>
            ) : (
              userProfileData.books.map((book) => (
                <Book
                  key={book._id}
                  book={book}
                  visitedUser={userProfileData}
                  currentUser={currentUserData}
                />
              ))
            )}
          </div>

          {/* <ComposeEntry /> */}
        </StyledDiv>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
