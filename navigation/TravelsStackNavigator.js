import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravelsScreen from "../screens/TravelsScreen";
import VisitScreen from "../screens/VisitScreen";
//import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const TravelsStack = createNativeStackNavigator();

const TravelsStackNavigator = () => {
  return (
    <TravelsStack.Navigator
      initialRouteName="Travels"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(169,147,179,1)",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          //fontWeight: "bold",
        },
      })}
    >
      <TravelsStack.Screen
        name="Travels"
        component={TravelsScreen}
        options={{ title: "Mes visites" }}
      />
      <TravelsStack.Screen
        name="Visit"
        component={VisitScreen}
        options={{ title: "Mes visites" }}
      />
    </TravelsStack.Navigator>
  );
};

export default TravelsStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
