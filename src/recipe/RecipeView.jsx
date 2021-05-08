import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import RecipeProvider from "./RecipeContext";
import RecipeDetail from "./RecipeDetail";
import RecipeList from "./RecipeList";
import RecipeCreate from "./RecipeCreate";

function RecipeView() {
  const { path } = useRouteMatch();

  return (
    <RecipeProvider>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/list`} />
        </Route>
        <Route path={`${path}/list`}>
          <RecipeList />
        </Route>
        <Route path={`${path}/create`}>
          <RecipeCreate />
        </Route>
        <Route exact path={`${path}/:id`}>
          <RecipeDetail />
        </Route>
      </Switch>
    </RecipeProvider>
  );
}

export default RecipeView;
