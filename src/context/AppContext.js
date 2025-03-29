import { createContext, useContext, useState } from "react";
const AppContext = createContext();


export const AppProvider = ({ children }) => {
 
  
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

 


  return (
    <AppContext.Provider value={{user,setUser,token,setToken}}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom Hook to Use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
