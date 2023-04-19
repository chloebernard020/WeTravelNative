import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlaceScreen from "../screens/PlaceScreen";
import RegFormScreen from "../screens/RegFormScreen";
import AuthFormScreen from "../screens/AuthFormScreen";
import AskMailScreen from "../screens/AskMailScreen";
import EditPasswordScreen from "../screens/EditPasswordScreen";
import { NavigationContainer } from "@react-navigation/native";

const AuthentificationStack = createNativeStackNavigator();

const AuthentificationStackNavigator = () => {
  return (
    <NavigationContainer>
      <AuthentificationStack.Navigator
        initialRouteName="AuthForm"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "rgba(161,158,204,1)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            //fontWeight: "bold",
          },
        })}
      >
        <AuthentificationStack.Screen
          name="AuthForm"
          component={AuthFormScreen}
          options={{ title: "Connexion" }}
        />

        <AuthentificationStack.Screen
          name="RegForm"
          component={RegFormScreen}
          options={{ title: "Inscription" }}
        />

        <AuthentificationStack.Screen
          name="AskMail"
          component={AskMailScreen}
          options={{ title: "Votre mail" }}
        />

        <AuthentificationStack.Screen
          name="EditPassword"
          component={EditPasswordScreen}
          options={{ title: "Modification du mot de passe" }}
        />
      </AuthentificationStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthentificationStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
