import { createContext, useState } from "react";

const linkWa =  import.meta.env.VITE_WP_URL;
const linkInsta = import.meta.env.VITE_INSTA_URL;

export const RedesContext = createContext({
  currentRedes:{
    linkWa,
    linkInsta
  },
  setCurrentRedes: () => null
});

export const RedesProvider = ({ children }) => {
  const [ currentRedes, setCurrentRedes ] = useState({
    linkWa,
    linkInsta
  });
  const value = { currentRedes, setCurrentRedes };
  return <RedesContext.Provider value={value}>{children}</RedesContext.Provider>
}
