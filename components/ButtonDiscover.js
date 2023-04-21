import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// This component has two props: "name" and "age"
export const ButtonDiscover = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, styles.signInButton]}
      onPress={() => navigation.navigate("Place")}
    >
      <Text style={styles.loginText}>Découvrir</Text>
    </TouchableOpacity>
  );
};

export default ButtonDiscover;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
});
