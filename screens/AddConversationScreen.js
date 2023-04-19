import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
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
  containerResearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 50,
    width: 380,
    shadowColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginVertical: 10,
    marginLeft: 5,
    //borderWidth: 1,
    //borderColor: "#ccc",
  },

  research: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    color: "#000",
  },
  mainContainer: {
    flexDirection: "row",

    margin: 10,
  },
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
    alignItems: "center",
    height: 1000,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedDate: {
    marginBottom: 10,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
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

  header: {
    fontSize: 28,
    marginBottom: 5,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },
  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
    color: "rgba(69, 82, 152, 1)",
  },
  respoContainer: {
    flex: 1,
  },
  respoText: {
    textAlign: "right",
    fontSize: 14,
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 40,
    borderRadius: 30,
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

  whiteSquare: {
    height: 200,
    width: 380,
    backgroundColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginRight: 15,
    marginLeft: 15,

    marginHorizontal: 15,
    marginTop: 20,
  },
});
