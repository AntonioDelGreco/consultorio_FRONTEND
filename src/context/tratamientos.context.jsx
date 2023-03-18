import { createContext, useState } from "react";

export const TratamientoContext = createContext({
  currentTratamiento:null,
  setCurrentTratamiento: () => null
});

export const TratamientoProvider = ({ children }) => {
  const [ currentTratamiento, setCurrentTratamiento ] = useState(null);
  const value = { currentTratamiento, setCurrentTratamiento };
  return <TratamientoContext.Provider value={value}>{children}</TratamientoContext.Provider>
}