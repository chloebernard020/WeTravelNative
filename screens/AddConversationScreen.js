import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { fetchConversations, addConversation } from "../api/conversationapi";
import { fetchAmities } from "../api/amitieapi";
import { fetchCompte } from "../api/compteapi";
import AuthContext from "../AuthContext";

const AddConversationScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [amis, setAmis] = useState([]);

  const loadAmities = async () => {
    const amitiesData = await fetchAmities();
    const newFriends = await Promise.all(
      amitiesData.map(async (amitie) => {
        if (amitie.compte1Id === user.id || amitie.compte2Id === user.id) {
          const otherId =
            amitie.compte1Id === user.id ? amitie.compte2Id : amitie.compte1Id;
          const otherCompte = await fetchCompte(otherId);
          return {
            id: otherCompte.id,
            nom: otherCompte.nom,
            prenom: otherCompte.prenom,
            mail: otherCompte.mail,
          };
        }
      })
    );
    setAmis(newFriends.filter((friend) => friend !== undefined));
  };
  useEffect(() => {
    loadAmities();
  }, []);

  const AddConversation = async (ami) => {
    try {
      await addConversation(user.id, ami.id);
      const conversations = await fetchConversations();
      const conversation = conversations.find(
        (v) =>
          (v.compte1Id === user.id && v.compte2Id === ami.id) ||
          (v.compte2Id === user.id && v.compte1Id === ami.id)
      );

      navigation.navigate("Conversation", { conversation, amis });
    } catch (error) {
      console.error(error);
    }
    // Masque le date picker une fois la date sélectionnée
  };

  return (
    <ScrollView>
      {amis.map((account) => {
        return (
          <View key={account.id}>
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.titleText}>
                    {account.nom} {account.prenom}
                  </Text>
                  <Text style={styles.text}>{account.mail}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    style={[styles.buttonDeleteContainer, styles.signInButton]}
                    onPress={() => {
                      AddConversation(account);
                    }}
                  >
                    <Text style={styles.loginText}>Envoyer un message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.whiteLine} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default AddConversationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    margin: 10,
  },

  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    color: "rgba(57, 56, 131, 1)",
    paddingRight: 5,
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  buttonDeleteContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 120,
    borderRadius: 30,
  },

  signInButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },

  loginText: {
    color: "white",
    fontSize: 15,
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },
});
