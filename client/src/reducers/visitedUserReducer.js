const userReducer = (state = "", action) => {
  switch (action.type) {
    case "getVisitedUserID":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
