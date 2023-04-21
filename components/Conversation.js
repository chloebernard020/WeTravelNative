import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

// This component has two props: "name" and "age"
export const Conversation = ({ conversation, amis, navigation }) => {
  return (
    <TouchableOpacity
      key={conversation.id}
      style={styles.conversationItem}
      onPress={() =>
        navigation.navigate("Conversation", { conversation, amis })
      }
    >
      <Text style={styles.conversationName}>
        {amis.find(
          (v) =>
            v.id === conversation.compte1Id || v.id === conversation.compte2Id
        )?.nom || ""}{" "}
        {amis.find(
          (v) =>
            v.id === conversation.compte1Id || v.id === conversation.compte2Id
        )?.prenom || ""}
      </Text>
      <Ionicons name="chevron-forward" style={styles.arrow}></Ionicons>
    </TouchableOpacity>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  arrow: {
    fontSize: 30,
    color: "grey",
  },

  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  conversationName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
});
