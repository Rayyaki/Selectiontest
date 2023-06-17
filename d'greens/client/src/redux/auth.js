const init = {
  name: "",
  email: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    console.log(action.payload);
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type == "logout") {
    return init;
  }
  return state;
}

export default userReducer;
