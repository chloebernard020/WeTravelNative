import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { fetchComptes, fetchCompte } from "../api/compteapi";
import { addDemande } from "../api/demandeapi";
import { fetchAmities, removeAmitie } from "../api/amitieapi";
import AuthContext from "../AuthContext";

const AddFriendsScreen = () => {
  const { user } = useContext(AuthContext);
  const [amis, setAmis] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [amities, setAmities] = useState([]);
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  useEffect(() => {
    const loadAmities = async () => {
      try {
        const amitiesData = await fetchAmities();
        const newFriends = [];
        for (const amitie of amitiesData) {
          if (amitie.compte1Id === user.id || amitie.compte2Id === user.id) {
            const otherId =
              amitie.compte1Id === user.id
                ? amitie.compte2Id
                : amitie.compte1Id;
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
        setAmis(newFriends);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    };
    loadAmities();
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        let displayedAccounts = await fetchComptes();
        if (searchName) {
          displayedAccounts = displayedAccounts.filter((a) =>
            a.mail.toLowerCase().includes(searchName.toLowerCase())
          );
        }
        // Filter out the current user's account
        displayedAccounts = displayedAccounts.filter((a) => a.id !== user.id);
        setAccounts(displayedAccounts);
      } catch (error) {
        console.log(error);
      }
    };
    loadAccounts();
  }, [searchName]);
  useEffect(() => {
    const getAmities = async () => {
      try {
        const lesAmities = await fetchAmities();
        setAmities(lesAmities);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    };
    getAmities();
  }, []);
  const handleAddDemande = async (user2) => {
    try {
      await addDemande(user, user2);
    } catch (error) {
      console.error(error);
    }
  };
  const [showBox, setShowBox] = useState(true);
  const showConfirmDialog = (user) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer votre ami(e) ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteAmi(user);
          },
        },
        // Le bouton Non
        // Ne fait rien mais enlève le message
        {
          text: "Non",
        },
      ]
    );
  };
  const handleDeleteAmi = async (user2) => {
    try {
      const amitie = amities.find(
        (a) =>
          (a.compte1Id === user.id || a.compte2Id === user.id) &&
          (a.compte1Id === user2.id || a.compte2Id === user2.id)
      );
      await removeAmitie(amitie.id);
      setAmities((prevAmities) =>
        prevAmities.filter((a) => a.id !== amitie.id)
      );

      setAmis((prevAmis) => prevAmis.filter((a) => a.id !== user2.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerResearch}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher par mail ..."
          value={searchName}
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          onChangeText={handleSearchNameChange}
        />
        <View style={styles.searchIcon}>
          <Image source={require("../assets/loupe.png")} style={styles.icon} />
        </View>
      </View>
      <ScrollView>
        {accounts.map((account) => {
          const isFriend = amis.some((a) => a.id === account.id);
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
                    {isFriend ? (
                      <TouchableOpacity
                        style={[
                          styles.buttonDeleteContainer,
                          styles.signInButton,
                        ]}
                        onPress={() => {
                          showConfirmDialog(account);
                        }}
                      >
                        <Text style={styles.loginText}>Supprimer</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[styles.buttonContainer, styles.signInButton]}
                        onPress={() => {
                          handleAddDemande(account);
                        }}
                      >
                        <Text style={styles.loginText}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.whiteLine} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddFriendsScreen;

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
    fontSize: 22,
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
