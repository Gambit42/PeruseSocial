const userReducer = (state = "", action) => {
  switch (action.type) {
    case "getUserID":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
