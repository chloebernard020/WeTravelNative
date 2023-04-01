import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceScreen from "../screens/PlaceScreen";
import ExploreScreen from "../screens/ExploreScreen";
import AllPlacesScreen from "../screens/AllPlacesScreen";
import AddVisitScreen from "../screens/AddVisitScreen";

const ExploreStack = createNativeStackNavigator();

const ExploreStackNavigator = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(161,158,204,1)",
        },

        //headerTintColor: "rgba(161,158,204,1)",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <ExploreStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
        }}
      />

      <ExploreStack.Screen
        name="AllPlaces"
        component={AllPlacesScreen}
        options={{ title: "Tous les lieux" }}
      />
      <ExploreStack.Screen
        name="Place"
        component={PlaceScreen}
        options={{ title: "Informations sur le lieu" }}
      />

      <ExploreStack.Screen
        name="AddVisit"
        component={AddVisitScreen}
        options={{ title: "Ajouter une visite" }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
