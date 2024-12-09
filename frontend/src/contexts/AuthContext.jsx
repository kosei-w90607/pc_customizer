import { createContext } from 'react';

export const AuthContext = createContext({
  loading: true,
  setLoading: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});