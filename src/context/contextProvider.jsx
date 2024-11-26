import React, {useState } from "react";
import { InfostructureContext } from "./context";

const ContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isLogged, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Initialize user as null if it holds user data
  const [savedSettings, setSavedSettings] = useState({theme:null,showPricing:null});


  const contextValues = {
    cartCount,
    setCartCount,
    isLogged,
    setLoggedIn,
    user,
    savedSettings,
    setSavedSettings,
    setUser,
    AuthenticatedStatus: (val) => {
      sessionStorage.setItem("AuthStatus", val);
      setLoggedIn(val); // Update isLogged if AuthenticatedStatus is called
    },
  };

  return (
    <InfostructureContext.Provider value={contextValues}>
      {children}
    </InfostructureContext.Provider>
  );
};

export default ContextProvider;
