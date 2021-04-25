import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import RecipeEdit from "RecipeEdit";
import RecipeList from "RecipeList";

function RecipeView() {
  const { path } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/list`} />
        </Route>
        <Route path={`${path}/list`}>
          <RecipeList />
        </Route>
        <Route path={`${path}/create`}>
          <RecipeEdit />
        </Route>
        <Route path={`${path}/:id/edit`}>
          <RecipeEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default RecipeView;
