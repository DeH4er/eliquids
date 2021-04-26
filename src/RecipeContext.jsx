import React, { useContext } from "react";
import service from "./recipe-api";

export const Context = React.createContext({ service });

export function useRecipeContext() {
  return useContext(Context);
}

function RecipeProvider({ children }) {
  return <Context.Provider value={{ service }}>{children}</Context.Provider>;
}

export default RecipeProvider;
