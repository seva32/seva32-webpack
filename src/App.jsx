import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import Router from "./Router";
import { Home } from "./domain/Home";
import { Posts } from "./domain/Posts";
import NotFound from "./domain/NotFound/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import RedirectWithStatus from "./components/RedirectWithStatus/RedirectWithStatus";
import { SigninFormUI } from "./domain/SigninPage";
import { SignupFormUI } from "./domain/SignupPage";
import { Signout } from "./domain/SignoutPage";
import Loading from "./components/Loading";
// import Test from "./domain/Test/Test";

if (!process.env.BROWSER) {
  global.window = {};
}

const LoadableTodos = Loadable({
  loader: () => import("./domain/Todos/Todos"),
  loading: Loading,
});

const LoadableTest = Loadable({
  loader: () => import("./domain/Test/Test"),
  loading: Loading,
  delay: 2000,
});

// eslint-disable-next-line react/prop-types
const App = ({ ssrLocation, context }) => (
  <Router ssrLocation={ssrLocation} context={context}>
    <ErrorBoundary>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin" component={SigninFormUI} />
        <Route exact path="/signup" component={SignupFormUI} />
        <Route exact path="/signout" component={Signout} />
        <Route path="/posts" component={Posts} />
        <Route path="/test" component={LoadableTest} />
        <Route path="/todos" component={LoadableTodos} />
        <RedirectWithStatus status={301} from="/home" to="/" />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  </Router>
);

export default App;
