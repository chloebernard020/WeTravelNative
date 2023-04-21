import { React, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { fetchFavorisParCompte } from "../api/favorisapi";
import { fetchLieu } from "../api/lieuxapi";
import { fetchVisitesParCompte } from "../api/visiteapi";

import AuthContext from "../AuthContext";

import FavoriteCard from "../components/FavoriteCard";

const FavorisScreen = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [visits, setVisits] = useState([]); // initialisation du state pour les visites
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [toVisitPlaces, setToVisitPlaces] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [activeButton, setActiveButton] = useState("visited");

  // On récupère tous les lieux visités par l'utilisateur
  useEffect(() => {
    const loadVisits = async () => {
      const visitsData = await fetchVisitesParCompte(user.id); // appel à votre fonction d'appel API
      setVisits(visitsData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadVisits();
  }, []);

  // On récupère les lieux favoris de l'utilisateur
  useEffect(() => {
    const getFavorites = async () => {
      if (user) {
        const newFavorites = await fetchFavorisParCompte(user.id);
        setFavorites(newFavorites);
      }
    };
    getFavorites();
  }, [user, favorites]);

  // Et on récupère les informations de ces lieux
  useEffect(() => {
    const loadLieux = async () => {
      const newLieux = await Promise.all(
        favorites.map((favori) => fetchLieu(favori.lieuId))
      );
      setLieux(newLieux);
    };
    loadLieux();
  }, [favorites]);

  // On sépare les lieux visités des lieux non visités et on fait un boucle for permettant de les séparer
  useEffect(() => {
    const newVisitedPlaces = [];
    const newToVisitPlaces = [];

    lieux.forEach((lieu) => {
      const isVisited = visits.some((visit) => visit.lieuId === lieu.id);
      if (isVisited) {
        newVisitedPlaces.push(lieu);
      } else {
        newToVisitPlaces.push(lieu);
      }
    });

    setVisitedPlaces(newVisitedPlaces);
    setToVisitPlaces(newToVisitPlaces);
  }, [lieux, visits]);

  // On définit un displayedPlaces qui correspond aux lieux affichés selon le bouton sélectionné
  const displayedPlaces =
    activeButton === "visited" ? visitedPlaces : toVisitPlaces;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Mes favoris</Text>
        <View style={styles.whiteLine} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              activeButton === "visited" && styles.activeButton,
            ]}
            onPress={() => setActiveButton("visited")}
          >
            <Text style={styles.buttonText}>Lieux visités</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              activeButton === "toVisit" && styles.activeButton,
            ]}
            onPress={() => setActiveButton("toVisit")}
          >
            <Text style={styles.buttonText}>Lieux à voir</Text>
          </TouchableOpacity>
        </View>

        {displayedPlaces.map((place) => (
          <FavoriteCard key={place.id} place={place} />
        ))}
      </View>
    </ScrollView>
  );
};

export default FavorisScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
    height: 800,
  },

  header: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  subheader: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  description: {
    fontSize: 14,
    marginRight: 30,
    marginBottom: 15,
    width: 200,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  white: {
    backgroundColor: "white",
    marginHorizontal: 10,

    width: 410,
    marginBottom: 20,
    flexDirection: "row",
  },

  whiteLine: {
    height: 2,
    marginTop: 5,
    marginBottom: 5,
    width: 380,
    backgroundColor: "white",
  },

  buttonContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
    borderColor: "white",
  },

  activeButton: {
    backgroundColor: "#fff",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
