import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export const ButtonAddFriends = ({ navigation, amis, setAmis }) => {
  return (
    <TouchableOpacity
      style={styles.buttonAddFriend}
      onPress={() => navigation.navigate("AddFriends", { amis, setAmis })}
    >
      <Ionicons name="person-add" size={30} color="rgba(57, 56, 131, 1)" />
    </TouchableOpacity>
  );
};

export default ButtonAddFriends;
const styles = StyleSheet.create({
  buttonAddFriend: {
    flexDirection: "row",
    borderColor: "rgba(57, 56, 131, 1)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
