import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchConversations } from "../api/conversationapi";
import { fetchCompte } from "../api/compteapi";
import AuthContext from "../AuthContext";

const ChatsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [amis, setAmis] = useState([]);

  const loadConversations = async () => {
    try {
      const conversationsData = await fetchConversations();
      const newConversations = [];
      const newFriends = [];

      for (const conversation of conversationsData) {
        if (
          conversation.compte1Id === user.id ||
          conversation.compte2Id === user.id
        ) {
          newConversations.push(conversation);

          const otherId =
            conversation.compte1Id === user.id
              ? conversation.compte2Id
              : conversation.compte1Id;

          const otherCompte = await fetchCompte(otherId);

          const friend = {
            id: otherCompte.id,
            nom: otherCompte.nom,
            prenom: otherCompte.prenom,
            adresse: otherCompte.adresse,
          };

          newFriends.push(friend);
        }
      }

      setConversations(newConversations);
      setAmis(newFriends);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadConversations();
    const interval = setInterval(() => {
      loadConversations();
    }, 5000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddConversation")}
        >
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
      {conversations.map((conversation) => (
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
                v.id === conversation.compte1Id ||
                v.id === conversation.compte2Id
            )?.nom || ""}{" "}
            {amis.find(
              (v) =>
                v.id === conversation.compte1Id ||
                v.id === conversation.compte2Id
            )?.prenom || ""}
          </Text>
          <Ionicons name="chevron-forward" style={styles.arrow}></Ionicons>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default ChatsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },

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
  header: { flexDirection: "row", justifyContent: "space-between" },

  title: {
    fontSize: 28,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },
  conversationName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  conversationUnreadBadge: {
    backgroundColor: "#F24F04",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  conversationUnreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 70,
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: "rgba(57, 56, 131, 1)",
    alignItems: "center",
    justifyContent: "center",
  },

  textButton: { color: "white", fontSize: 35 },
});
