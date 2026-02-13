import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
