import { React, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchFavorisParCompte } from "../api/favorisapi";
import { fetchLieu } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";
import AuthContext from "../AuthContext";
import { fetchVisitesParCompte } from "../api/visiteapi";

const FavorisScreen = ({ route }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [visits, setVisits] = useState([]); // initialisation du state pour les visites
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [toVisitPlaces, setToVisitPlaces] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [lieux, setLieux] = useState([]);
  const [activeButton, setActiveButton] = useState("visited");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const handleSearchNameChange = (text) => {
    setSearchName(text);
    const filtered = displayedPlaces.filter((place) =>
      place.nom.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  useEffect(() => {
    const loadVisits = async () => {
      const visitsData = await fetchVisitesParCompte(user.id); // appel à votre fonction d'appel API
      setVisits(visitsData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadVisits();
  }, []);

  useEffect(() => {
    const getFavorites = async () => {
      if (user) {
        const newFavorites = await fetchFavorisParCompte(user.id);
        setFavorites(newFavorites);
      }
    };
    getFavorites();
  }, [user, favorites]);

  useEffect(() => {
    const loadLieux = async () => {
      const newLieux = await Promise.all(
        favorites.map((favori) => fetchLieu(favori.lieuId))
      );
      setLieux(newLieux);
    };
    loadLieux();
  }, [favorites]);

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
          <View key={place.id} style={styles.white}>
            <Image
              style={styles.photo}
              source={{
                uri: place.photo || "",
              }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.subheader}>{place.nom}</Text>
              <Text style={styles.description} numberOfLines={3}>
                {place.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FavorisScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
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

  appreciation: {
    fontSize: 14,
    marginRight: 15,
    marginBottom: 10,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
    alignItems: "center",
  },

  icon: {
    color: "red",

    marginVertical: 5,
  },

  headdescription: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(57, 56, 131, 1)",
  },

  container: {
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
    height: 800,
  },
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

  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 300,
    width: 450,
    backgroundColor: "rgba(245,245,245,1)",

    marginBottom: 20,
    marginTop: 20,
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
  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
    width: 150,
    borderRadius: 30,
  },
  loginText: {
    color: "white",
  },
});
