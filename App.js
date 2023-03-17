import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootTabNavigator from "./navigation/RootTabNavigator";
import AuthentificationStackNavigator from "./navigation/AuthentificationStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ExploreStackNavigator } from "./navigation/ExploreStackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthFormScreen } from "./screens/AuthFormScreen";

export default function App() {
  const [loggedUser, setLoggedUser] = useState();
  const authForm = !loggedUser ? (
    <AuthentificationStackNavigator
      onLoginSuccessful={(user) => setLoggedUser(user)}
    />
  ) : null;
  const roottab = loggedUser ? <RootTabNavigator /> : null;

  return (
    <View style={styles.container}>
      {authForm}
      {roottab}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },
});
