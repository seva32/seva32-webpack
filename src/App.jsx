import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./domain/Home";
import { Posts } from "./domain/Posts";
import { Todos } from "./domain/Todos";
import NotFound from "./domain/NotFound/NotFound";
import RedirectWithStatus from "./components/RedirectWithStatus/RedirectWithStatus";
import { SigninFormUI } from "./domain/SigninPage";
import { SignupFormUI } from "./domain/SignupPage";
import { Signout } from "./domain/SignoutPage";

const App = () => (
  <>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin" component={SigninFormUI} />
      <Route exact path="/signup" component={SignupFormUI} />
      <Route exact path="/signout" component={Signout} />
      <Route path="/posts" component={Posts} />
      <Route path="/todos" component={Todos} />
      <RedirectWithStatus status={301} from="/home" to="/" />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default App;
