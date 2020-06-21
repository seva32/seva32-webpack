import React, { useState, useContext, createContext } from "react";

export const AppContext = createContext();

const initialState = "Sebas";

const AppProvider = (props) => {
  const [name, setName] = useState(initialState);

  const changeName = (newName) => {
    setName(newName);
  };

  const appData = { name, changeName };

  return <AppContext.Provider value={{ appData }} {...props} />;
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };

// donde quiero aplicar el provider, por app.js:
// <AppProvider></AppProvider>
// el componente que usa el contexto importa el contexto:
// const appContext = useAppContext();
// y lo usa:
// appContext.appData.changeName('Dany')
