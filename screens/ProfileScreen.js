import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { useContext } from "react";
import { fetchFavorisParCompte } from "../api/favorisapi";
import { fetchCompte } from "../api/compteapi";
import { fetchLieu } from "../api/lieuxapi";
import {
  fetchAppreciationsParCompte,
  removeAppreciation,
} from "../api/appreciationapi";

import { fetchAmities, addAmitie } from "../api/amitieapi";
import { fetchDemandes, removeDemande } from "../api/demandeapi";
import AuthContext from "../AuthContext";
import { fetchVisitesParCompte } from "../api/visiteapi";
import ScrollFriends from "../components/ScrollFriends.js";
import Demande from "../components/Demande.js";
import ButtonAddFriends from "../components/ButtonAddFriends.js";

const ProfileScreen = ({ navigation }) => {
  const { user, setAuthenticated } = useContext(AuthContext);
  const [compte, setCompte] = useState();
  const [demandes, setDemandes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visits, setVisits] = useState([]); // initialisation du state pour les visites
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [amis, setAmis] = useState([]);
  const [appreciations, setAppreciations] = useState([]);
  const [comptesDemandeurs, setComptesDemandeurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchCompte(user.id);
      setCompte(profile);
    };
    fetchData();
  }, [compte]);
  useEffect(() => {
    const loadDemandes = async () => {
      const demandesData = await fetchDemandes(); // appel à votre fonction d'appel API
      const newDemandes = [];
      demandesData.forEach(async (demande) => {
        if (demande.compteReceveurId === user.id) {
          newDemandes.push(demande);
        }
      });
      setDemandes(newDemandes); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadDemandes();
    const interval = setInterval(() => {
      loadDemandes();
    }, 2000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadComptes = async () => {
      const newComptes = await Promise.all(
        demandes.map((demande) => fetchCompte(demande.compteDemandeurId))
      );
      setComptesDemandeurs(newComptes);
    };
    loadComptes();
  }, [demandes]);
  const loadAmities = async () => {
    const amitiesData = await fetchAmities(); // appel à votre fonction d'appel API
    const newFriends = [];
    amitiesData.forEach(async (amitie) => {
      if (amitie.compte1Id === user.id || amitie.compte2Id === user.id) {
        const otherId =
          amitie.compte1Id === user.id ? amitie.compte2Id : amitie.compte1Id;
        const otherCompte = await fetchCompte(otherId); // appel à une fonction pour récupérer les infos du compte associé
        const friend = {
          id: otherCompte.id,
          nom: otherCompte.nom,
          prenom: otherCompte.prenom,
          adresse: otherCompte.adresse,
        };
        newFriends.push(friend);
      }
    });
    setAmis(newFriends); // mise à jour du state avec les données récupérées depuis l'API
  };
  useEffect(() => {
    loadAmities();
  }, []);

  //Renvoie une fonction de rappel
  // on récupère toutes les informations relatives à un compte
  const fetchData = useCallback(async () => {
    const userData = await fetchCompte(user.id);
    setCompte(userData);

    const visitsData = await fetchVisitesParCompte(userData.id);
    setVisits(visitsData);

    const appreciationsData = await fetchAppreciationsParCompte(userData.id);
    setAppreciations(appreciationsData);

    const favoritesData = await fetchFavorisParCompte(userData.id);
    setFavorites(favoritesData);

    const newLieux = await Promise.all(
      favoritesData.map((favori) => fetchLieu(favori.lieuId))
    );
    setLieux(newLieux);

    const newVisitedPlaces = newLieux.filter((lieu) =>
      visitsData.some((visit) => visit.lieuId === lieu.id)
    );
    setVisitedPlaces(newVisitedPlaces);
  }, []);

  // UseEffect permet d'exécuter la fonction
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  // Fonction permettant d'ajouter un ami a partir d'une demande, on enlève l'objet créé dans la table demande et on en ajoute un dans la table amis
  const handleAcceptFriend = async (demande) => {
    await addAmitie(user.id, demande.compteDemandeurId);
    await removeDemande(demande.id);
    setDemandes((prevDemandes) =>
      prevDemandes.filter((prevDemande) => prevDemande.id !== demande.id)
    );
    await loadAmities();
  };

  // Fonction permettant de décliner une demande, on enlève l'objet créé dans l'API des demandes
  const handleDeclineFriend = async (demande) => {
    await removeDemande(demande.id);
    setDemandes((prevDemandes) =>
      prevDemandes.filter((prevDemande) => prevDemande.id !== demande.id)
    );
    await loadAmities();
  };

  // Gestion de la fenêtre de dialogue pour la suppression de l'appréciation
  const [showBox, setShowBox] = useState(true);
  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer votre appréciation ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteAppreciation(id);
            // Suppression de l'appréciation
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

  // Fonction permettant de supprimer une appréciation
  const handleDeleteAppreciation = async (id) => {
    setShowBox(false);
    await removeAppreciation(id);
    setAppreciations((prevAppreciations) =>
      prevAppreciations.filter((a) => a.id !== id)
    );
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image
          style={[styles.circle, styles.circleContainer]}
          source={require("../assets/empire.jpg")}
        />
        {compte && (
          <Text style={styles.text} key={compte.id}>
            {compte.prenom} {compte.nom}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.buttonContainer2, styles.editButton]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.loginText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.whiteLine} />
      <View style={{ backgroundColor: "rgba( 224, 222, 238, 1)" }}>
        <View style={{ backgroundColor: "rgba( 224, 222, 238, 1)" }}>
          <Text style={styles.text}>Demandes d'ami</Text>
          <View>
            {
              /*S'il n'y a pas de demande on affiche un message*/
              demandes.length === 0 ? (
                <Text style={styles.aucunText}>
                  Aucune demande d'ami pour le moment
                </Text>
              ) : (
                // Sinon on les affiche avec les boutons accepter et refuser
                demandes.map((demande, index) => (
                  <Demande
                    key={demande.id - index}
                    demande={demande}
                    compteDemandeur={comptesDemandeurs[index]}
                    onAccept={() => handleAcceptFriend(demande)}
                    onDecline={() => handleDeclineFriend(demande)}
                  />
                ))
              )
            }
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>Amis</Text>
            {/*Bouton permettant de naviguer dans la page des amis (qui affiche tous les comptes et qui permet d'ajouter ou de supprimer un ami)*/}
            <ButtonAddFriends
              navigation={navigation}
              amis={amis}
              setAmis={setAmis}
            />
          </View>

          <ScrollView horizontal>
            {
              /*S'il n'y a pas d'ami on affiche un message*/
              amis.length === 0 ? (
                <Text style={styles.aucunText}>Aucun ami pour le moment</Text>
              ) : (
                amis.map(
                  (
                    _ami,
                    index // Sinon on affiche les composants associés aux amis
                  ) => <ScrollFriends key={index} ami={_ami} />
                )
              )
            }
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.text}>Les lieux que vous avez adoré</Text>
            <TouchableOpacity
              style={styles.buttonAddFriend}
              onPress={() => navigation.navigate("Favoris")}
            >
              <Text style={{ fontSize: 15, color: "rgba(57, 56, 131, 1)" }}>
                Voir plus
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal>
            {
              /* Idem pour les lieux visités*/
              visitedPlaces.length === 0 ? (
                <Text style={styles.aucunText}>Aucun lieu visité</Text>
              ) : (
                visitedPlaces.flatMap((place) => (
                  <View key={place.id}>
                    <View style={styles.scroll}>
                      <Image
                        style={styles.photo}
                        source={{ uri: place.photo }}
                      />
                    </View>
                  </View>
                ))
              )
            }
          </ScrollView>
          <Text style={styles.text}>Vos appréciations</Text>
          <ScrollView horizontal>
            {
              /* Idem pour les appréciations*/
              appreciations.length === 0 ? (
                <Text>Aucune appréciation pour le moment</Text>
              ) : (
                appreciations.map((appreciation) => (
                  <View key={appreciation.id} style={styles.whiteSquare}>
                    <Text>{appreciation.date}</Text>

                    <Text>{appreciation.commentaire}</Text>
                    <TouchableOpacity
                      style={styles.deleteAppreciationButton}
                      onPress={() => showConfirmDialog(appreciation.id)}
                    >
                      <Text style={styles.deleteAppreciationText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )
            }
          </ScrollView>
          <TouchableOpacity
            style={[styles.buttonContainer2, styles.editButton]}
            onPress={handleLogout}
          >
            <Text style={styles.loginText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba( 224, 222, 238, 1)",
    width: 420,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  buttonAddFriend: {
    flexDirection: "row",
    borderColor: "rgba(57, 56, 131, 1)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  deleteAppreciationButton: {
    backgroundColor: "lightgrey",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,

    borderRadius: 20,
  },

  deleteAppreciationText: {
    color: "white",
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,

    width: 100,
    borderRadius: 10,
  },
  acceptButton: {
    backgroundColor: "rgba(86,141,172,1)",
  },
  refuseButton: {
    backgroundColor: "rgb(233,85,85)",
  },
  loginText: {
    color: "white",
  },
  aucunText: {
    color: "gray",
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: "cover",

    alignItems: "center",
  },

  photo: {
    width: 170,
    height: 200,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  circle: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: "white",
    marginTop: 60,
    opacity: 0.8,
  },
  whiteLine: {
    height: 2,
    alignContent: "center",
    width: 400,
    backgroundColor: "white",
  },
  textRight: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 30,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba( 224, 222, 238, 1)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  lignehorizontal: {
    color: "white",
  },

  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 30,
  },

  editButton: {
    backgroundColor: "rgba(120,116,172,1)",
    marginBottom: 20,
  },

  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  whiteSquare: {
    width: 250,
    backgroundColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginHorizontal: 15,
  },
});
