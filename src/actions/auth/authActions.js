import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./authActionTypes";
// formProps = { email, password }
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signup", formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: AUTH_USER, payload: "" });
  dispatch({ type: AUTH_ERROR, payload: "" });
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signin", formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};
