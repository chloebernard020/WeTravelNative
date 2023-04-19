import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceScreen from "../screens/PlaceScreen";
import ConversationScreen from "../screens/ConversationScreen";
import AddConversationScreen from "../screens/AddConversationScreen";
import ChatsScreen from "../screens/ChatsScreen";
import AllPlacesScreen from "../screens/AllPlacesScreen";
const ChatStack = createNativeStackNavigator();

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "rgba(161,158,204,1)",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      })}
    >
      <ChatStack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen name="Conversation" component={ConversationScreen} />
      <ChatStack.Screen
        name="AddConversation"
        component={AddConversationScreen}
      />
    </ChatStack.Navigator>
  );
};

export default ChatStackNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
