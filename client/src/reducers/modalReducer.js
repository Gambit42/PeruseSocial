const ModalReducer = (state = false, action) => {
  switch (action.type) {
    case "Open_Modal":
      return (state = true);
    case "Close_Modal":
      return (state = false);
    default:
      return state;
  }
};

export default ModalReducer;
