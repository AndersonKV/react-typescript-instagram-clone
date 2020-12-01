import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { isAuthenticated } from "./auth";

//HOME
import Home from "./Pages/Home/Index/Index";
import Register from "./Pages/Home/Register/Register";
import Profile from "./Pages/Home/Profile/Profile";
import Post from "./Pages/Home/Post/Post";
import Explore from "./Pages/Home/Explore/Explore";
//APP
import AppHome from "./Pages/App/Home/Home";
import Logout from "./Pages/App/Logout/Logout";
import SendPost from "./Pages/App/SendPost/SendPost";
import Edit from "./Pages/App/Edit/Edit";
import NotFound from "./Pages/NotFound/NotFound";
import { isBoolean } from "util";

interface ComponentProps extends RouteProps {
  component?: any;
}

// const PrivateRoute: React.FC<ComponentProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         Boolean(isAuthenticated()) ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app" component={AppHome} />
        <Route path="/accounts/logout" component={Logout} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/explore/tags" component={Explore} />
        <Route exact path="/explore/tags/:word_search" component={Explore} />
        <Route path="/send/post" component={SendPost} />
        <Route path="/accounts/emailsignup" component={Register} />
        <Route path="/account/edit" component={Edit} />
        <Route exact path="/:profile/p/:id_post" component={Post} />
        <Route exact path="/profile/:profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
