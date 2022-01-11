import { createContext, useContext } from "react";

interface ITabContext {
  useTabItem(): boolean;
}

export const TabsCtx = createContext({
  useTabItem() { return false; }
} as ITabContext);

export const useTabContext = () => useContext(TabsCtx);