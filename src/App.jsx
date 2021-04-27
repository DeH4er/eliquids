import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, VStack } from "@chakra-ui/react";

import MixtureView from "MixtureView";
import RecipeView from "RecipeView";
import ConsumableView from "ConsumableView";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <VStack padding="4" spacing="4" alignItems="start">
            <Link to="/recipe">
              <Button>Recipes</Button>
            </Link>
            <Link to="/mixture">
              <Button>Mixtures</Button>
            </Link>
            <Link to="/consumable">
              <Button>Consumables</Button>
            </Link>
          </VStack>
        </Route>
        <Route path="/recipe">
          <RecipeView />
        </Route>
        <Route path="/mixture">
          <MixtureView />
        </Route>
        <Route path="/consumable">
          <ConsumableView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
