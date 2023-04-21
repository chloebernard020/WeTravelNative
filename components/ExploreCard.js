import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export const ExploreCard = ({ place, navigation, villes }) => {
  return (
    <View style={styles.whiteSquare}>
      <View style={styles.scroll}>
        <Image style={styles.photo} source={{ uri: place.photo }} />
        <Text style={styles.text}>
          {place.nom}, {villes.find((v) => v.id === place.villeId)?.nom || ""}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() => navigation.navigate("Place", { place })}
          >
            <Text style={styles.loginText}>Découvrir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExploreCard;
const styles = StyleSheet.create({
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

  scroll: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  photo: {
    width: 170,
    height: 160,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  text: {
    fontSize: 14,
    marginBottom: 20,
    color: "rgba(69, 82, 152, 1)",
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
  },

  signInButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },

  loginText: {
    color: "white",
  },
});
