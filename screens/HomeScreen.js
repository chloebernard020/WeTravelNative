import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AuthContext from "../AuthContext";
import RootTabNavigator from "../navigation/RootTabNavigator";
import AuthentificationStackNavigator from "../navigation/AuthentificationStackNavigator";

const HomeScreen = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    // appel à l'API de déconnexion
    // si la déconnexion réussit, mettre authenticated à false
    setAuthenticated(false);
  };
  let ComponentToRender = null;

  if (authenticated) {
    ComponentToRender = RootTabNavigator;
  } else {
    ComponentToRender = AuthentificationStackNavigator;
  }

  return (
    <View style={{ flex: 1 }}>
      <ComponentToRender />
    </View>
  );
};

export default HomeScreen;
