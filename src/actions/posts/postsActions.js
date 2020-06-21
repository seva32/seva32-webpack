import { POSTS_FETCH, POSTS_FETCH_ERROR } from "./postsActionTypes";
import loadData from "../../utils/fetch/loadData";

export const fetchPosts = () => async (dispatch) => {
  try {
    const data = loadData("posts");
    dispatch({ type: POSTS_FETCH, payload: data });
  } catch (e) {
    dispatch({ type: POSTS_FETCH_ERROR, payload: "Error fetching posts" });
  }
};
