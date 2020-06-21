import { Home } from "./Home";
import { Posts } from "./Posts";
import { Todos } from "./Todos";
import NotFound from "./NotFound/NotFound";
// import RedirectWithStatus from "./components/RedirectWithStatus/RedirectWithStatus";
import { SigninFormUI } from "./SigninPage";
import { SignupFormUI } from "./SignupPage";
import { Signout } from "./SignoutPage";

import loadData from "../utils/fetch/loadData";

const Routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/signin",
    exact: true,
    component: SigninFormUI,
  },
  {
    path: "/signup",
    exact: true,
    component: SignupFormUI,
  },
  {
    path: "/signout",
    exact: true,
    component: Signout,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/todos",
    component: Todos,
    loadData: () => loadData("todos"),
  },
  {
    component: NotFound,
  },
];

export default Routes;
