import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import MixtureView from "MixtureView";
import RecipeView from "RecipeView";
import { Button, VStack } from "@chakra-ui/react";

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
      </Switch>
    </Router>
  );
}

export default App;
