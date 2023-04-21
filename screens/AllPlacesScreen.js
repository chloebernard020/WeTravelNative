import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TextInput, Image } from "react-native";
import { fetchLieux } from "../api/lieuxapi";

import Place from "../components/Place";

const AllPlacesScreen = ({ navigation }) => {
  // Initialisation des lieux
  const [places, setPlaces] = useState([]);

  // Initialisation du texte présent dans la barre de recherche
  const [searchName, setSearchName] = useState("");

  // Fonction permettant la recherche de lieu
  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        let displayedPlaces = await fetchLieux();
        if (searchName) {
          // On filtre les lieux par nom
          displayedPlaces = displayedPlaces.filter((p) =>
            p.nom.toLowerCase().includes(searchName.toLowerCase())
          );
        }
        // On met à jour les lieux affichés selon le filtre
        setPlaces(displayedPlaces);
      } catch (error) {
        console.log(error);
      }
    };
    loadPlaces();
  }, [searchName]);

  return (
    <View style={styles.container}>
      <View style={styles.containerResearch}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher par nom ..."
          value={searchName}
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          onChangeText={handleSearchNameChange}
        />
        <View>
          <Image source={require("../assets/loupe.png")} />
        </View>
      </View>
      <ScrollView>
        {places.map((place) => (
          <Place key={place.id} place={place} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
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
  },

  research: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    color: "#000",
  },
});
