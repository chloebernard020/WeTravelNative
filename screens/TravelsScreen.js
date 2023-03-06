import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const TravelsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteLine} />
      <Text style={styles.header}>Dernières visites</Text>
      <Text>Liste des dernieres visites effectuées : Lieu + appréciation</Text>
      <Text style={styles.header}>Rechercher une visite</Text>
    </View>
  );
};

export default TravelsScreen;
const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,

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
    backgroundColor: "rgba( 226, 223, 231, 1)",
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

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 350,
    backgroundColor: "white",
  },
});
