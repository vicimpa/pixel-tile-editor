import { FC } from "react";

import { useTabContext } from "./library/tabsContext";

export const TabItem: FC = ({ children }) => {
  const tabContext = useTabContext();



  return (
    <>
      {children}
    </>
  );
};