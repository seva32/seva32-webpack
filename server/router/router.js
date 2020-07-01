import passport from "passport";
import { signup, signin } from "../contollers/authentications";
// eslint-disable-next-line no-unused-vars
import passportConfig from "../middleware/passport";
import loadData from "../../src/utils/fetch/requireLoadData";
import render from "../rendering/render";

// uso local strategy porque me llega email y pass
const requireSignin = passport.authenticate("local", {
  session: false,
});

export default (app) => {
  app.post("/api/signup", signup);
  app.post("/api/signin", requireSignin, signin);

  app.get("/posts", (req, res) => {
    // eslint-disable-next-line wrap-iife
    (async function load() {
      const posts = await loadData("posts");
      render(req, res, { posts }, {});
    })();
  });

  app.get("/todos", (req, res) => {
    // eslint-disable-next-line wrap-iife
    (async function load() {
      const todos = await loadData("todos");
      render(req, res, {}, { todos });
    })();
  });

  app.get("*", (req, res) => {
    render(req, res, {});
  });
};
