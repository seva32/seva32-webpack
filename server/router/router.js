const passport = require("passport");
const Auth = require("../contollers/authentications");
// eslint-disable-next-line no-unused-vars
const passportConfig = require("../middleware/passport");
const Loadable = require("react-loadable");

// creo un obj para indicar que uso jwt y no cookies que es default de passport
const requireAuth = passport.authenticate("jwt", { session: false });

// uso local strategy porque me llega email y pass
const requireSignin = passport.authenticate("local", {
  session: false,
});

const loadData = require("../../src/utils/fetch/requireLoadData");

const render = require("../rendering/render");

module.exports = (app) => {
  app.post("/api/signup", Auth.signup);
  app.post("/api/signin", requireSignin, Auth.signin);

  app.get("/posts", (req, res) => {
    // eslint-disable-next-line wrap-iife
    (async function load() {
      const posts = await loadData("posts");
      Loadable.preloadAll(() => {
        render(req, res, { posts }, {});
      });
    })();
  });

  app.get("/todos", (req, res) => {
    // eslint-disable-next-line wrap-iife
    (async function load() {
      const todos = await loadData("todos");
      Loadable.preloadAll(() => {
        render(req, res, {}, { todos });
      });
    })();
  });

  app.get("*", (req, res) => {
    Loadable.preloadAll(() => {
      render(req, res, {});
    });
  });
};
