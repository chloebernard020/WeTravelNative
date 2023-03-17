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
      try {
        const lesPays = await fetchLesPays();
        setPays(lesPays);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    };
    getPays();
  }, []);

  const randomIndex = Math.floor(Math.random() * pays.length);
  const randomPays = pays[randomIndex];

  const [lieuxParPays, setLieuxParPays] = useState([]);

  useEffect(() => {
    const getLieux = async () => {
      try {
        const villes = await fetchVillesParPays(randomPays.id);
        const lieuxParVilles = await Promise.all(
          villes.map((ville) => fetchLieuxParVille(ville.id))
        );
        setLieuxParPays(lieuxParVilles);
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    };
    getLieux();
  }, []);

  return (
    <ScrollView>
      <View style={styles.page}>
        <View>
          <Text style={styles.header1}>Rechercher une destination</Text>
        </View>
        <View style={styles.containerResearch}>
          <TextInput
            style={styles.research}
            placeholder="La tour eiffel ..."
            imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          />
          <View style={styles.searchIcon}>
            <Image
              source={require("../assets/loupe.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <ScrollView horizontal>
              {randomPlaces.map((place) => (
                <View style={styles.whiteSquare}>
                  <View style={styles.scroll}>
                    <Image style={styles.photo} source={{ uri: place.photo }} />
                    <Text style={styles.text}>
                      {place.nom},{" "}
                      {villes.find((v) => v.id === place.villeId)?.nom || ""}
                    </Text>
                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.signInButton]}
                      onPress={() => navigation.navigate("Place", { place })}
                    >
                      <Text style={styles.loginText}>Découvrir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={styles.whiteSquare2}>
                <View
                  style={[
                    styles.scroll2,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AllPlaces")}
                  >
                    <Text style={styles.plusinfos}>
                      Découvrir plus de destinations
                    </Text>
                    <Text
                      style={[
                        styles.plusinfos,
                        { marginLeft: 65, fontSize: 40 },
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={styles.whiteLine} />
            <Text style={styles.header}>Découvrir {randomPays?.nom}</Text>
            <ScrollView horizontal>
              {lieuxParPays.map((place) => (
                <View style={styles.whiteSquare}>
                  <View style={styles.scroll}>
                    <Text style={styles.text}>
                      {place.nom},{" "}
                      {villes.find((v) => v.id === place.villeId)?.nom || ""}
                    </Text>
                    <Image style={styles.photo} source={{ uri: place.photo }} />
                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.signInButton]}
                      onPress={() =>
                        navigation.navigate("Place", { lieu: place })
                      }
                    >
                      <Text style={styles.loginText}>Découvrir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
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

  scroll2: {
    marginRight: 15,
    marginLeft: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  plusinfos: {
    alignItems: "center",

    color: "rgba(57, 56, 131, 1)",
    fontSize: 20,
  },

  formImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  page: {
    backgroundColor: "rgba( 224, 222, 238, 1)",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  header1: {
    fontSize: 28,
    marginTop: 60,
    marginBottom: 20,
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

  icon: {
    width: 20,
    height: 20,
    tintColor: "#999",
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 224, 222, 238, 1)",
    alignItems: "center",
  },

  photo: {
    width: 170,
    height: 160,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 300,
    width: 200,
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

  whiteSquare2: {
    height: 300,
    width: 200,
    backgroundColor: "rgba(242,241,248,1)",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "rgba(270,270,270,1)",
    shadowOffset: { width: 2, height: 2 },
    opacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    marginHorizontal: 15,
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
    backgroundColor: "rgba(120,116,172,1)",
  },
  loginText: {
    color: "white",
  },
});
