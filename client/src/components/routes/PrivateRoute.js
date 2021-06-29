import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUserData, setCurrentUserData] = useState({
    userName: "",
    email: "",
    image: "",
    book: [{}],
  });
  const [userDataChanges, setUserDataChanges] = useState({
    userName: "",
    image: "",
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
      .get("http://localhost:4000/user", config)
      .then((res) => {
        const userName = res.data.user.userName;
        const email = res.data.user.email;
        const image = res.data.user.image;
        const books = res.data.user.books;

        if (mounted) {
          setCurrentUserData({
            books: books,
            userName: userName,
            email: email,
            image: image,
          });
          setUserDataChanges({ ...userDataChanges, userName: userName });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component
            {...props}
            currentUserData={currentUserData}
            setCurrentUserData={setCurrentUserData}
            userDataChanges={userDataChanges}
            setUserDataChanges={setUserDataChanges}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default PrivateRoute;
