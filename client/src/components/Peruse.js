import React from "react";
import { Switch, Route, useLocation } from "react-router";
import LoggedInRoute from "./routes/LoggedInRoute";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/MyBooksPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ThoughtPage from "./pages/ThoughtPage";
import ProfileModal from "./utils/ProfileModal";
import ComposeModal from "./utils/ComposeModal";
import BookModal from "./utils/BookModal";
import Modal from "../Modal";

const Peruse = () => {
  const location = useLocation();
  let background = location.state && location.state.background;
  return (
    <div>
      <Switch location={background || location}>
        <LoggedInRoute exact path="/" component={LoginPage} />
        <LoggedInRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/:userName" component={ProfilePage} />

        <Route path="/" component={NotFoundPage} />
      </Switch>

      {background && (
        <Modal>
          <PrivateRoute path="/settings" component={ProfileModal} />
          <PrivateRoute path="/compose" component={ComposeModal} />
          <PrivateRoute
            path="/:userName/thought/:thoughtID"
            component={BookModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Peruse;
