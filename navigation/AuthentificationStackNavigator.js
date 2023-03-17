import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceScreen from "../screens/PlaceScreen";
import RegFormScreen from "../screens/RegFormScreen";
import AuthFormScreen from "../screens/AuthFormScreen";
import { NavigationContainer } from "@react-navigation/native";

const AuthentificationStack = createNativeStackNavigator();

const AuthentificationStackNavigator = ({ onLoginSuccessful }) => {
  const f = (a) => {
    onLoginSuccessful(a);
  };

  const AuthFormComponent = (props) => (
    <AuthFormScreen {...props} onLoginSuccessful={f} />
  );
  return (
    <NavigationContainer>
      <AuthentificationStack.Navigator
        initialRouteName={AuthFormScreen}
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
          options={{ title: "Connexion" }}
          component={AuthFormComponent}
        />

        <AuthentificationStack.Screen
          name="RegForm"
          component={RegFormScreen}
          options={{ title: "Inscription" }}
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
