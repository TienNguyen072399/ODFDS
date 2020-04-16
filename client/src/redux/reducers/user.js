const user = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.user;
      console.log("Setting redux");
      console.log(state);
      return state;

    default:
      return state;
  }
};

export default user;
