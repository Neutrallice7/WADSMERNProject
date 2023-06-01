import { createContext } from 'react';

// Create a new context called AuthContext
export const AuthContext = createContext({
  isLoggedIn: false, // Default value of isLoggedIn
  login: () => {}, // Default value of login
  logout: () => {} // Default value of logout
});
