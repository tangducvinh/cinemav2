"use client";

import { useState, createContext, useContext } from "react";

const AppContext = createContext({
  token: "",
  setToken: (token: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

const AppProvider = ({
  children,
  initToken = "",
}: {
  children: React.ReactNode;
  initToken?: string;
}) => {
  const [token, setToken] = useState(initToken);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
