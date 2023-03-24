import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import AuthContext from "./AuthContext";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // appel à l'API de déconnexion
    // si la déconnexion réussit, mettre authenticated à false
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, user, setUser }}
    >
      <HomeScreen />
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },
});
