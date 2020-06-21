import { AUTH_USER, AUTH_ERROR } from "../actions/auth/authActionTypes";

const initialState = {
  authenticated: "",
  errorMessage: "error",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
