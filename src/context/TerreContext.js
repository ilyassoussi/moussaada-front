import { createContext, useState } from 'react';

export const TerreContext = createContext(null);

export const TerreProvider = ({ children }) => {
  const [terreInfo, setTerreInfo] = useState(null);
  return (
    <TerreContext.Provider value={{ terreInfo, setTerreInfo }}>
      {children}
    </TerreContext.Provider>
  );
};
