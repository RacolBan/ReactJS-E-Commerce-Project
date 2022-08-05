import React, { createContext } from "react";
import ProductsLaptop from "../src/API/ProductLaptop";
import ProductsApple from "./API/ProductApple";
import UserAPI from "./API/UserAPI";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    ProductsLaptop: ProductsLaptop(),
    ProductsApple: ProductsApple(),
    UserAPI: UserAPI(),
    
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
