import RecipeView from "RecipeView";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/recipe" />
        </Route>
        <Route path="/recipe">
          <RecipeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
