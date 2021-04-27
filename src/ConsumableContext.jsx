import React, { useContext } from "react";
import consumableService from "./consumable-api";

export const Context = React.createContext({ consumableService });

export function useConsumableContext() {
  return useContext(Context);
}

function ConsumableProvider({ children }) {
  return (
    <Context.Provider value={{ consumableService }}>
      {children}
    </Context.Provider>
  );
}

export default ConsumableProvider;
