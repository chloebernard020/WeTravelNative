import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravelsScreen from "../screens/TravelsScreen";
import VisitDetailsScreen from "../screens/VisitDetailsScreen";
import EditVisitScreen from "../screens/EditVisitScreen";
//import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const TravelsStack = createNativeStackNavigator();

const TravelsStackNavigator = () => {
  return (
    <TravelsStack.Navigator
      initialRouteName="Travels"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(161,158,204,1)",
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <TravelsStack.Screen
        name="Travels"
        component={TravelsScreen}
        options={{ title: "Mes visites" }}
      />
      <TravelsStack.Screen
        name="VisitDetails"
        component={VisitDetailsScreen}
        options={{ title: "Détails" }}
      />
      <TravelsStack.Screen
        name="EditVisit"
        component={EditVisitScreen}
        options={{ title: "Modification de la visite" }}
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
