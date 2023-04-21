// Imports nécessaires au fonctionnement de la page
import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchLieu } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";
import { fetchPays } from "../api/paysapi";
import { fetchCulturesParLieu } from "../api/cultureapi";
import { fetchAppreciationsParLieu } from "../api/appreciationapi";
import { fetchFavorisParCompte } from "../api/favorisapi";
import { addFavori, removeFavori } from "../api/favorisapi";
import AuthContext from "../AuthContext";

const PlaceScreen = ({ route, navigation }) => {
  const { place } = route.params; // Récupération de l'objet place passé en paramètre de la route
  const { user } = useContext(AuthContext); // Récupération de l'utilisateur qui est un contexte

  // Initialisation des variables nécessaires dans la page
  const [lieu, setLieu] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [ville, setVille] = useState([]);
  const [pays, setPays] = useState([]);
  const [appreciations, setAppreciations] = useState([]);

  const [favorites, setFavorites] = useState([]);

  // On cherche si le lieu est en favori ou non pour l'utilisateur connecté
  const isFavorite = favorites.some((f) => f.lieuId === place.id);

  // Récupère à partir des fichiers du dossier api les informations sur le lieu, la ville, le pays, le point culture et les appreciations
  useEffect(() => {
    const getPlaceDetails = async () => {
      const placeDetails = await fetchLieu(place.id);
      setLieu(placeDetails);

      const villeDetails = await fetchVille(place.villeId);
      setVille(villeDetails);

      const paysDetails = await fetchPays(villeDetails.paysId);
      setPays(paysDetails);

      const culturesDetails = await fetchCulturesParLieu(place.id);
      setCultures(culturesDetails);

      const appreciationsDetails = await fetchAppreciationsParLieu(place.id);
      setAppreciations(appreciationsDetails);
      // On vérifie qu'il y ait bien un user de connecté et on récupère les favoris de l'utilisateur
      if (user) {
        const newFavorites = await fetchFavorisParCompte(user.id);
        setFavorites(newFavorites);
      }
    };
    // On exécute la fonction avec toutes ces informations
    getPlaceDetails();
  }, [place.id, user, favorites]);

  // Fonction pour changer le coeur de favori et pour mettre ou enlever un favori dans l'API
  const toggleFavorite = async () => {
    const favori = favorites.find(
      (f) => f.compteId === user.id && f.lieuId === place.id
    );
    if (favori) {
      try {
        // Si le lieu est déja en favori et que l'on appuie sur l'icone, on l'enlève des favoris et on met à jour la liste des favoris en filtrant
        await removeFavori(favori.id);
        setFavorites(
          favorites.filter(
            (f) => !(f.lieuId === place.id && f.compteId === user.id)
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // si on appuie sur le bouton pour ajouter en favori, on ajoute le favori et on met à jour la liste des favoris en ajoutant le lieu
        const newFavori = await addFavori(user, place);
        setFavorites([...favorites, newFavori]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // On initialise l'icone du coeur, soit plein si le lieu est en favori, soit vide si le lieu n'est pas en favori
  const heartIcon = isFavorite ? "heart" : "heart-outline";

  return (
    // Affichage de la vue
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: lieu.photo }} />
        <View style={styles.informations}>
          <View>
            <Text style={styles.header}>
              {
                lieu.nom
                  ? lieu.nom
                  : "" /*Affiche le nom du lieu s'il existe, évite les erreur lorsque le useEffect n'est pas encore exécuté*/
              }
            </Text>
            <Text style={styles.subheader}>
              {ville.nom ? ville.nom : ""},{" "}
              {
                pays.nom
                  ? pays.nom
                  : "" /*Idem pour le nom du pays et de la ville*/
              }
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={
                () =>
                  navigation.navigate("AddVisit", {
                    place,
                  }) /*Si on appuie sur le bouton, on est redirigé sur la page AddVisit et on passe en paramètre de la route le lieu en question*/
              }
            >
              <Text style={styles.loginText}>Ajouter une visite</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons name={heartIcon} size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Description</Text>

          <Text style={styles.description}>{lieu.description}</Text>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Point culture</Text>
          {cultures.length > 0 ? (
            cultures.map((culture) => (
              <View key={culture.id}>
                <Text style={styles.title}>{culture.nom}</Text>
                <Text style={styles.description}>{culture.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.message}>
              Il n'y a pas d'anecdotes pour ce lieu
            </Text>
          )}

          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Appréciations</Text>

          <ScrollView horizontal>
            {cultures.length > 0 ? (
              appreciations.map((appreciation) => (
                <View style={styles.whiteSquare} key={appreciation.id}>
                  <View style={styles.scroll}>
                    <Text style={styles.text}>{user.mail}</Text>
                    <Text style={styles.text}>{appreciation.date}</Text>
                    <Text style={styles.text}>{appreciation.commentaire}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.message}>
                Il n'y a pas d'appréciations pour ce lieu
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginBottom: 10,
    marginTop: 25,
    color: "rgba(57, 56, 131, 1)",
    fontWeight: "bold",
    fontSize: 16,
  },
  informations: {
    marginLeft: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  subheader: {
    fontSize: 20,
    marginTop: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  description: {
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
    marginVetical: 15,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  message: {
    color: "grey",
  },
  appreciation: {
    fontSize: 14,
    marginRight: 15,
    marginBottom: 10,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  headdescription: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(57, 56, 131, 1)",
  },

  container: {
    //alignItems: "center",

    backgroundColor: "rgba( 246, 246, 250, 1)",
  },

  photo: {
    width: 420,
    height: 250,
    marginBottom: 5,

    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 10,
  },
  whiteSquare: {
    height: 120,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,

    marginHorizontal: 15,
    marginTop: 20,
  },
  whiteLine: {
    height: 2,
    marginTop: 10,
    marginBottom: 10,
    width: 380,
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 150,
    borderRadius: 30,
  },
  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
    width: 150,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },
  loginText: {
    color: "white",
  },
  text: {
    color: "rgba(69, 82, 152, 1)",
    marginVertical: 5,
    marginLeft: 10,
  },

  icon: {
    color: "red",
    marginVertical: 5,
    marginLeft: 10,
  },
});
