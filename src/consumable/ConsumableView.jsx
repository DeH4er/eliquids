import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ConsumableProvider from "./ConsumableContext";
import ConsumableDetail from "./ConsumableDetail";
import ConsumableEdit from "./ConsumableEdit";
import ConsumableList from "./ConsumableList";

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
        <Route path={`${path}/:type/create`}>
          <ConsumableEdit />
        </Route>
        <Route path={`${path}/:type/:id/edit`}>
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
