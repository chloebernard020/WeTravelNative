import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import PlacesItem from "../components/PlacesItem";
import { fetchLieux } from "../api/lieuxapi";
const AllPlacesScreen = ({ lieu, navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const displayedPlaces = await fetchLieux();
        setPlaces(displayedPlaces);
      } catch (error) {
        console.log(error);
      }
    };
    loadPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerResearch}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher un lieu par nom, localisation, type de lieu..."
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
        />
      </View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlacesItem lieu={item} />}
      />
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 24,
    marginTop: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },

  containerResearch: {
    alignItems: "center",
  },

  whiteSquare: {
    height: 300,
    width: 350,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  lignehorizontal: {
    color: "white",
  },
  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },

  research: {
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 10,
    color: "rgba(100,100,100,1)",
    marginTop: 20,
    width: 350,
    height: 35,
  },
});
