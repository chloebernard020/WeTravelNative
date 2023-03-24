import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExploreStackNavigator from "./ExploreStackNavigator";
import TravelsStackNavigator from "./TravelsStackNavigator";
import FavorisStackNavigator from "./FavorisStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(161,158,204,1)"
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "ExploreStackNavigator") {
              iconName = focused ? "globe" : "globe-outline";
            } else if (route.name === "TravelsStackNavigator") {
              iconName = focused ? "airplane" : "airplane-outline";
            } else if (route.name === "FavorisStackNavigator") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "ProfileStackNavigator") {
              iconName = focused ? "person" : "person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "lightgrey",
          tabBarStyle: { backgroundColor: "rgba(161,158,204,1)" },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="ExploreStackNavigator"
          component={ExploreStackNavigator}
          options={{ title: "Explorer" }}
        />
        <Tab.Screen
          name="TravelsStackNavigator"
          component={TravelsStackNavigator}
          options={{ title: "Mes visites" }}
        />
        <Tab.Screen
          name="FavorisStackNavigator"
          component={FavorisStackNavigator}
          options={{ title: "Mes favoris" }}
        />
        <Tab.Screen
          name="ProfileStackNavigator"
          component={ProfileStackNavigator}
          options={{ title: "Profil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;

const styles = StyleSheet.create({
  container: { backgroundColor: "rgba(169,147,179,1)" },
});
