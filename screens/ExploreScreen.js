import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import ExploreCard from "../components/ExploreCard";

import { fetchLieux } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";
import { fetchVillesParPays } from "../api/villeapi";
import { fetchLieuxParVille } from "../api/lieuxapi";
import { fetchLesPays } from "../api/paysapi";

const ExploreScreen = ({ navigation }) => {
  //Initialisation de la variable représentant les lieux aléatoires sélectionnés dans l'API
  const [randomPlaces, setRandomPlaces] = useState([]);

  useEffect(() => {
    const selectRandomLieux = async () => {
      const lieux = await fetchLieux();
      const randomPlaces = [];

      // On en sélectionne 3 donc tant que la taille de la liste n'est pas égale à 3 on continue de généré des chiffres aléatoires parmi les lieux de l'API
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

  // Initialisation de la liste des villes
  const [villes, setVilles] = useState(null);

  useEffect(() => {
    const loadVilles = async () => {
      // Pour toutes les villes de la liste, on sélectionne celles qui correspondant aux lieux sélectionnés aléatoirement
      const newVilles = await Promise.all(
        randomPlaces.map((place) => fetchVille(place.villeId))
      );
      setVilles(newVilles);
    };
    loadVilles();
  }, [randomPlaces]);

  // On initialise les pays présents dans l'API et les lieux par pays
  const [pays, setPays] = useState([]);
  const [lieuxParPays, setLieuxParPays] = useState([]);

  // On initialise la variable correspondant au pays aléatoirement choisi dans la base de données
  const [randomPays, setRandomPays] = useState(null);
  useEffect(() => {
    const getPays = async () => {
      try {
        const lesPays = await fetchLesPays();
        setPays(lesPays);
      } catch (error) {
        console.error(error);
      }
    };
    getPays();
  }, []);

  // Fonction permettant la sélection du pays aléatoirement dans la liste
  useEffect(() => {
    const getRandomPays = () => {
      if (pays.length > 0 && !randomPays) {
        const randomIndex = Math.floor(Math.random() * pays.length);
        const selectedPays = pays[randomIndex];
        setRandomPays(selectedPays);
      }
    };
    getRandomPays();
  }, [pays, randomPays]);

  // On récupère ainsi les lieux ayant comme Pays le pays sélectionné aléatoirement
  useEffect(() => {
    const getLieux = async () => {
      try {
        if (randomPays) {
          const villes = await fetchVillesParPays(randomPays.id);
          const lieuxParVilles = await Promise.all(
            villes.map((ville) => fetchLieuxParVille(ville.id))
          );
          setLieuxParPays(lieuxParVilles);
        }
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
      }
    };
    getLieux();
  }, [randomPays]);

  // Et les villes correspondantes
  const [randomVilles, setRandomVilles] = useState(null);

  useEffect(() => {
    const loadRandomVilles = async () => {
      const newVilles = await Promise.all(
        lieuxParPays.map((place) => fetchVille(place.villeId))
      );
      setRandomVilles(newVilles);
    };
    loadRandomVilles();
  }, [lieuxParPays]);

  return (
    <ScrollView>
      <View style={styles.page}>
        <Image
          style={styles.formImage}
          source={require("../assets/logo.png")}
        />
        <View>
          <Text style={styles.header1}>Explorer les destinations</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <ScrollView horizontal>
              {randomPlaces.map((place, index) => (
                <ExploreCard
                  place={place}
                  navigation={navigation}
                  villes={villes}
                  key={`${place.id}-${index}`}
                />
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
              {lieuxParPays.flatMap((lieux) =>
                lieux.map((place) => (
                  <ExploreCard
                    key={place.id}
                    place={place}
                    navigation={navigation}
                    villes={randomVilles}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "rgba( 224, 222, 238, 1)",
    alignItems: "center",
  },

  formImage: {
    width: 100,
    height: 100,
    marginTop: 40,
  },

  header1: {
    fontSize: 28,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "rgba(57, 56, 131, 1)",
  },

  container: {
    backgroundColor: "rgba( 224, 222, 238, 1)",
    alignItems: "center",
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

  plusinfos: {
    alignItems: "center",
    color: "rgba(57, 56, 131, 1)",
    fontSize: 20,
  },

  scroll2: {
    marginRight: 15,
    marginLeft: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },

  header: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },
});
