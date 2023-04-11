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
  const { place } = route.params;
  const { user } = useContext(AuthContext);
  const [lieu, setLieu] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [ville, setVille] = useState([]);
  const [pays, setPays] = useState([]);
  const [appreciations, setAppreciations] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const isFavorite = favorites.some((f) => f.lieuId === place.id);

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

      if (user) {
        const newFavorites = await fetchFavorisParCompte(user.id);
        setFavorites(newFavorites);
      }
    };
    getPlaceDetails();
  }, [place.id, user, favorites]);

  const toggleFavorite = async () => {
    const favori = favorites.find(
      (f) => f.compteId === user.id && f.lieuId === place.id
    );
    if (favori) {
      try {
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
        const newFavori = await addFavori(user, place);
        setFavorites([...favorites, newFavori]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const heartIcon = isFavorite ? "heart" : "heart-outline";

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: lieu.photo }} />
        <View style={styles.informations}>
          <View>
            <Text style={styles.header}>{lieu.nom ? lieu.nom : ""}</Text>
            <Text style={styles.subheader}>
              {ville.nom ? ville.nom : ""}, {pays.nom ? pays.nom : ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("AddVisit", { place })}
            >
              <Text style={styles.loginText}>Ajouter une visite</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleFavorite}
              color={isFavorite ? "red" : "gray"}
            >
              <Ionicons name={heartIcon} size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Description</Text>

          <Text style={styles.description}>{lieu.description}</Text>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Point culture</Text>
          {cultures.map((culture) => (
            <View>
              <Text style={styles.title}>{culture.nom}</Text>

              <Text style={styles.description}>{culture.description}</Text>
            </View>
          ))}

          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Appréciations</Text>

          <ScrollView horizontal>
            {appreciations.map((appreciation) => (
              <View style={styles.whiteSquare}>
                <View style={styles.scroll}>
                  <Text style={styles.text}>{user.mail}</Text>
                  <Text style={styles.text}>{appreciation.date}</Text>
                  <Text style={styles.text}>{appreciation.commentaire}</Text>
                </View>
              </View>
            ))}
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
