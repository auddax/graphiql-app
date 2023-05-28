import React, { PropsWithChildren, createContext } from "react";
import RootStore from "./rootStore";

const store = new RootStore();

export const StoreContext = createContext(store);

export const StoreProvider = (props: PropsWithChildren) => {
  return(
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}
