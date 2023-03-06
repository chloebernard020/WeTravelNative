import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PlacesItem from "../components/PlacesItem";
import { fetchLieux } from "../api/lieuxapi";
const AllPlacesScreen = ({}) => {
  const [places, setPlaces] = useState([]);

  const loadPlaces = async () => {
    try {
      const displayedPlaces = await fetchLieux();
      setPlaces(displayedPlaces);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.printButton]}
        onPress={loadPlaces}
      >
        <Text>Voir tous les lieux</Text>
      </TouchableOpacity>
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
    alignItems: "center",
  },

  photo: {
    width: 160,
    height: 160,
    marginBottom: 20,
    borderRadius: 10,
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
});
