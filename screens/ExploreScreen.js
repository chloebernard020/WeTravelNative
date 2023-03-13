import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { fetchLieux } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";
import { fetchVillesParPays } from "../api/villeapi";
import { fetchLieuxParVille } from "../api/lieuxapi";
import { fetchLesPays } from "../api/paysapi";
import { fetchPays } from "../api/paysapi";
import PlaceScreen from "./PlaceScreen";
const ExploreScreen = ({ navigation }) => {
  const [randomPlaces, setRandomPlaces] = useState([]);

  useEffect(() => {
    const selectRandomLieux = async () => {
      const lieux = await fetchLieux();
      const randomPlaces = [];

      while (randomPlaces.length < 3) {
        const randomIndex = Math.floor(Math.random() * lieux.length);
        const randomPlace = lieux[randomIndex];
        if (!randomPlaces.includes(randomPlace)) {
          randomPlaces.push(randomPlace);
        }
      }
      setRandomPlaces(randomPlaces);
    };
    selectRandomLieux();
  }, []);

  const [villes, setVilles] = useState(null);

  useEffect(() => {
    const loadVilles = async () => {
      const newVilles = await Promise.all(
        randomPlaces.map((place) => fetchVille(place.villeId))
      );
      setVilles(newVilles);
    };
    loadVilles();
  }, [randomPlaces]);

  const [pays, setPays] = useState([]);

  useEffect(() => {
    const getPays = async () => {
      const lesPays = await fetchLesPays();
      setPays(lesPays);
    };
    getPays();
  }, []);

  const randomIndex = Math.floor(Math.random() * pays.length);
  const randomPays = pays[randomIndex];

  const [lieuxParPays, setLieuxParPays] = useState([]);

  useEffect(() => {
    const getLieux = async () => {
      const villes = await fetchVillesParPays(randomPays.id);
      const lieuxParVilles = await Promise.all(
        villes.map((ville) => fetchLieuxParVille(ville.id))
      );
      setLieuxParPays(lieuxParVilles);
    };
    getLieux();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.whiteLine} />
        <View>
          <TouchableOpacity
            style={[styles.buttonContainer2, styles.signInButton]}
            onPress={() => navigation.navigate("AllPlaces")}
          >
            <Text style={styles.loginText}>Voir tous les lieux</Text>
            {/*A redéplacer*/}
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.whiteSquare}>
          {randomPlaces.map((place) => (
            <View style={styles.scroll}>
              <Text style={styles.text}>
                {place.nom},{" "}
                {villes.find((v) => v.id === place.villeId)?.nom || ""}
              </Text>
              <Image style={styles.photo} source={{ uri: place.photo }} />
              <TouchableOpacity
                style={[styles.buttonContainer, styles.signInButton]}
                onPress={() => navigation.navigate("Place", { lieu: place })}
              >
                <Text style={styles.loginText}>Découvrir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.whiteLine} />
        <Text style={styles.header}>Découvrir {randomPays?.nom}</Text>
        <ScrollView horizontal style={styles.whiteSquare}>
          {lieuxParPays.map((place) => (
            <View style={styles.scroll}>
              <Text style={styles.text}>
                {place.nom},{" "}
                {villes.find((v) => v.id === place.villeId)?.nom || ""}
              </Text>
              <Image style={styles.photo} source={{ uri: place.photo }} />
              <TouchableOpacity
                style={[styles.buttonContainer, styles.signInButton]}
                onPress={() => navigation.navigate("Place", { lieu: place })}
              >
                <Text style={styles.loginText}>Découvrir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  textLeft: {
    fontSize: 18,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 226, 223, 231, 1)",
    alignItems: "center",
    height: 750,
  },

  photo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 250,
    width: 380,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 20,
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
  },
  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    marginTop: 15,
    alignItems: "center",
    width: 200,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
});
