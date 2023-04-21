import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

// This component has two props: "name" and "age"
export const Message = ({ message, user }) => {
  return (
    <View
      key={message.id}
      style={[
        message.compteEnvoyeurId === user.id
          ? styles.messageSent
          : styles.messageReceived,
        message.compteEnvoyeurId === user.id && {
          backgroundColor: "rgb(101,124,159)",
          fontColor: "white",
        },
      ]}
    >
      <Text
        style={[
          message.compteEnvoyeurId === user.id && {
            color: "white",
          },
        ]}
      >
        {message.mess}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  chat: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 16,
  },
  chatMessage: {
    fontSize: 16,
    color: "#666666",
  },
  messageReceived: {
    alignSelf: "flex-start",
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  messageSent: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  message: {
    fontSize: 16,
    color: "#333333",
  },
});
