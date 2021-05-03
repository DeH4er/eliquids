import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ConsumableProvider from "./ConsumableContext";
import ConsumableEdit from "./ConsumableEdit";
import ConsumableList from "./ConsumableList";
import ConsumableDetail from "./ConsumableDetail";

function ConsumableView() {
  const { path } = useRouteMatch();

  return (
    <ConsumableProvider>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/list`} />
        </Route>
        <Route path={`${path}/list`}>
          <ConsumableList />
        </Route>
        <Route path={`${path}/create`}>
          <ConsumableEdit />
        </Route>
        <Route path={`${path}/:id/edit`}>
          <ConsumableEdit />
        </Route>
        <Route exact path={`${path}/:id`}>
          <ConsumableDetail />
        </Route>
      </Switch>
    </ConsumableProvider>
  );
}

export default ConsumableView;
