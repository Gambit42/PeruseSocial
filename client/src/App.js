import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { css } from "styled-components";
import "./styles/tailwind.css";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingPage from "./components/pages/LoadingPage";
import { useDispatch } from "react-redux";
import { login, getUserID } from "./actions/index";
import axios from "axios";
import Peruse from "./components/Peruse";

const StyledDeleteDiv = styled.div`
  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
    `}
`;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      method: ["GET"],
      header: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/private/hasSession", config)
      .then((res) => {
        if (res.data.isAuth) {
          console.log(res.data);
          dispatch(getUserID(res.data.data.userId));
          dispatch(login());
        }
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <StyledDeleteDiv isFixed={false}>
      <GlobalStyle />
      {!loading ? (
        <Router>
          <Peruse />
        </Router>
      ) : (
        <LoadingPage />
      )}
    </StyledDeleteDiv>
  );
}

export default App;
