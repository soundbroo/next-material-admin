import React, { useState, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    mainChart: null,
  });

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
