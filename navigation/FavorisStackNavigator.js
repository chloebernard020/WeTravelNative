import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceScreen from "../screens/PlaceScreen";

import FavorisScreen from "../screens/FavorisScreen";
import AllPlacesScreen from "../screens/AllPlacesScreen";
const FavorisStack = createNativeStackNavigator();

const FavorisStackNavigator = () => {
  return (
    <FavorisStack.Navigator
      initialRouteName="Favoris"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(161,158,204,1)",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <FavorisStack.Screen name="Mes favoris" component={FavorisScreen} />
    </FavorisStack.Navigator>
  );
};

export default FavorisStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
