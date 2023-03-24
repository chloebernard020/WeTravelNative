import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
});

export default AuthContext;
