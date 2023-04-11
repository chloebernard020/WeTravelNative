import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import fetchcomptes from "../api/compteapi.js";
import { useContext } from "react";
import { fetchFavorisParCompte } from "../api/favorisapi";
import { fetchLieu } from "../api/lieuxapi";
import { fetchAmitiesParCompte } from "../api/amitieapi";
import AuthContext from "../AuthContext";
import { fetchVisitesParCompte } from "../api/visiteapi";

const ProfileScreen = ({ navigation }) => {
  const { user, setAuthenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [visits, setVisits] = useState([]); // initialisation du state pour les visites
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [amis, setAmis] = useState([]);

  useEffect(() => {
    const loadAmities = async () => {
      const amitiesData = await fetchAmitiesParCompte(user.id); // appel à votre fonction d'appel API
      setVisits(amitiesData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadAmities();
  }, []);

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

    lieux.forEach((lieu) => {
      const isVisited = visits.some((visit) => visit.lieuId === lieu.id);
      if (isVisited) {
        newVisitedPlaces.push(lieu);
      }
    });

    setVisitedPlaces(newVisitedPlaces);
  }, [lieux, visits]);

  const handleLogout = () => {
    setAuthenticated(false);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={[styles.circle, styles.circleContainer]}
          source={require("../assets/empire.jpg")}
        />

        <Text style={styles.text}>
          {user.prenom} {user.nom}
        </Text>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.editButton]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.loginText}>Modifier le profil</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Amis</Text>

        <ScrollView>
          {amis.map((ami) => (
            <View key={ami.id} style={styles.circle}>
              <Image
                style={styles.photo}
                source={require("../assets/empire.jpg")}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={styles.text}>Les lieux que vous avez adoré</Text>
        <ScrollView horizontal>
          {visitedPlaces.flatMap((place) => (
            <View key={place.id} style={styles.whiteSquare}>
              <View style={styles.scroll}>
                <Image style={styles.photo} source={{ uri: place.photo }} />
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.editButton]}
          onPress={handleLogout}
        >
          <Text style={styles.loginText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
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

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    width: 120,
    borderRadius: 30,
  },

  editButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },

  preferencesContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    width: 150,
    borderRadius: 10,
  },
  preferencesButton: {
    backgroundColor: "white",
  },
  preferencesText: {
    color: "rgba(69,82,152,1)",
  },

  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
