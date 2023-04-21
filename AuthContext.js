import { createContext } from "react";
// Création d'un contexte permettant d'avoir accès aux informations du compte dans tous les screens

const AuthContext = createContext({
  authenticated: false,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
});

export default AuthContext;
