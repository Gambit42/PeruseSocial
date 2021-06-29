import menuReducer from "./menuReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import visitedUserReducer from "./visitedUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isMenuOpen: menuReducer,
  isLoggedIn: loginReducer,
  isModalOpen: modalReducer,
  userID: userReducer,
  visitedUserID: visitedUserReducer,
});

export default allReducers;
