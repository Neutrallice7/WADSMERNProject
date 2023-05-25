import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        {/* Switches for multiple redirects */}
        <Switch>
          {/* The root, to users */}
          <Route path="/" exact>
            <Users />
          </Route>
          {/* Route to the user's places */}
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          {/* Routing towards places */}
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          {/* Redirects to update place */}
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
