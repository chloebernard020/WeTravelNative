import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AuthContext from "../AuthContext";
import { fetchMessages, addMessage } from "../api/messageapi";

const ConversationScreen = ({ route }) => {
  const { conversation } = route.params;
  const { user } = useContext(AuthContext);
  const today = new Date();
  const { amis } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ami = amis.find(
    (v) => v.id === conversation.compte1Id || v.id === conversation.compte2Id
  );

  const fetchMessagesDetails = async () => {
    const messagesDetails = await fetchMessages();
    const newMessages = messagesDetails
      .filter((message) => message.conversationId === conversation.id)
      .map((message) => ({ ...message, date: new Date(message.date) }));
    newMessages.sort((a, b) => a.date - b.date); // tri des messages par date
    setMessages(newMessages);
  };

  useEffect(() => {
    fetchMessagesDetails();

    // Ajout d'un intervalle de 5 secondes pour récupérer les dernières données
    const interval = setInterval(() => {
      fetchMessagesDetails();
    }, 5000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (newMessage !== "") {
      await addMessage(user.id, ami.id, conversation.id, today, newMessage);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {ami.nom} {ami.prenom}
      </Text>

      {messages.map((message) => (
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
      ))}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ecrivez un message"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ConversationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "rgba(57, 56, 131, 1)",
  },
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: "rgb(101,124,159)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
