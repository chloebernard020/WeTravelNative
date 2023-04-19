import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AddFriendsScreen from "../screens/AddFriendsScreen";
import FavorisScreen from "../screens/FavorisScreen";
//import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(161,158,204,1)",
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          //fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Modification du profil" }}
      />
      <ProfileStack.Screen
        name="AddFriends"
        component={AddFriendsScreen}
        options={{ title: "Ajouter des amis" }}
      />

      <ProfileStack.Screen name="Favoris" component={FavorisScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
