import React, { ReactNode, createContext, useContext, useState } from "react";
import { LoaderContextProps } from "../interfaces/loader-context";

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

const LoaderContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  return <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
    {children}
  </LoaderContext.Provider>
}

const useLoaderContext = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if(!context) {
    throw new Error('useLoaderContext must be used within a LoaderContextProvider');
  }
  return context;
}

export { LoaderContextProvider, useLoaderContext };