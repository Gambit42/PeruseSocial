export const toggleMenu = () => {
  return {
    type: "toggleMenu",
  };
};

export const login = () => {
  return {
    type: "login",
  };
};

export const logout = () => {
  return {
    type: "logout",
  };
};

export const getUserID = (userData) => {
  return {
    type: "getUserID",
    payload: userData,
  };
};

export const getVisitedUserID = (visitedUserData) => {
  return {
    type: "getVisitedUserID",
    payload: visitedUserData,
  };
};

export const Open_Modal = () => {
  return {
    type: "Open_Modal",
  };
};

export const Close_Modal = () => {
  return {
    type: "Close_Modal",
  };
};
