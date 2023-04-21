import React, { useContext } from "react";
import { View } from "react-native";
import AuthContext from "../AuthContext";
import RootTabNavigator from "../navigation/RootTabNavigator";
import AuthentificationStackNavigator from "../navigation/AuthentificationStackNavigator";

const HomeScreen = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  let ComponentToRender = null;
  // On affiche une stack différente selon si l'utilisateur est authentifié ou non
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
