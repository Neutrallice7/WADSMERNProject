import { createContext } from 'react';

// Create the AuthContext using createContext
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});