import MixtureEdit from "MixtureEdit";
import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

function MixtureView() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`${path}/list`} />
      </Route>
      <Route path={`${path}/list`}>
        <div>Mixture List works!</div>
      </Route>
      <Route path={`${path}/create`}>
        <MixtureEdit />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <MixtureEdit />
      </Route>
      <Route path={`${path}/:id`}>
        <div>Mixture Detail works!</div>
      </Route>
    </Switch>
  );
}

export default MixtureView;
