const passport = require("passport");
const Auth = require("../contollers/authentications");
// eslint-disable-next-line no-unused-vars
const passportConfig = require("../middleware/passport");

// creo un obj para indicar que uso jwt y no cookies que es default de passport
const requireAuth = passport.authenticate("jwt", { session: false });

// uso local strategy porque me llega email y pass
const requireSignin = passport.authenticate("local", {
  session: false,
});

const loadData = require("../../src/utils/fetch/requireLoadData");

const render = require("../rendering/render");

module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.get("/test", (req, res, next) => {
    res.send([{ id: "uno", title: "uno" }]);
  });

  // eslint-disable-next-line no-unused-vars
  app.post("/test", (req, res, next) => {
    res.send({ token: "uno" });
  });

  app.get("/api/", requireAuth, (req, res) => {
    res.send({ hola: "chola" });
  });
  app.post("/api/signup", Auth.signup);
  app.post("/api/signin", requireSignin, Auth.signin);

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
