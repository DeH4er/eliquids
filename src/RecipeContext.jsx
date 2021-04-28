import React, { useContext } from "react";
import recipeService from "./recipe-api";
import consumablesService from "./consumable-api";

export const Context = React.createContext({
  recipeService,
  consumablesService,
});

export function useRecipeContext() {
  return useContext(Context);
}

function RecipeProvider({ children }) {
  return (
    <Context.Provider value={{ recipeService, consumablesService }}>
      {children}
    </Context.Provider>
  );
}

export default RecipeProvider;
