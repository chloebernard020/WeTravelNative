import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { fetchConversations } from "../api/conversationapi";
import { fetchCompte } from "../api/compteapi";

import AuthContext from "../AuthContext";

import Conversation from "../components/Conversation";

const ChatsScreen = ({ navigation }) => {
  // Récupération du contexte user
  const { user } = useContext(AuthContext);

  //Initilisation de la variable conversations et amis
  const [conversations, setConversations] = useState([]);
  const [amis, setAmis] = useState([]);

  // Fonction permettant la récupération des conversations
  const loadConversations = async () => {
    try {
      const conversationsData = await fetchConversations();
      const newConversations = [];
      const newFriends = [];

      // On récupère les conversations qui concernent l'utilisateur
      for (const conversation of conversationsData) {
        if (
          conversation.compte1Id === user.id ||
          conversation.compte2Id === user.id
        ) {
          newConversations.push(conversation);

          // Et on définit l'autre compte en regardant les identifiants des deux comptes rattachés à la conversation
          const otherId =
            conversation.compte1Id === user.id
              ? conversation.compte2Id
              : conversation.compte1Id;

          // Récupération du compte ami
          const otherCompte = await fetchCompte(otherId);

          // On définit un objet avec toutes les informations du compte sauf le mot de passe
          const friend = {
            id: otherCompte.id,
            nom: otherCompte.nom,
            prenom: otherCompte.prenom,
            mail: otherCompte.mail,
          };

          newFriends.push(friend);
        }
      }
      // Mise à jour du state
      setConversations(newConversations);
      setAmis(newFriends);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect permettant d'exécuter la fonction, on actualise toutes les 5 secondes au cas ou une conversation a été créée entre temps
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
        <Conversation
          key={conversation.id}
          amis={amis}
          conversation={conversation}
          navigation={navigation}
        />
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

  header: { flexDirection: "row", justifyContent: "space-between" },

  title: {
    fontSize: 28,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
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
