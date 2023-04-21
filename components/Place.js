import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export const Place = ({ place, navigation }) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{place.nom}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} numberOfLines={4}>
              {place.description}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() => navigation.navigate("Place", { place })}
          >
            <Text style={styles.loginText}>Découvrir</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.image} source={{ uri: place.photo }} />
      </View>
      <View style={styles.whiteLine} />
    </View>
  );
};

export default Place;
const styles = StyleSheet.create({
  mainContainer: {
    height: 230,
    flexDirection: "row",
    margin: 10,
  },

  contentContainer: {
    flex: 1,
    margin: 5,
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row",
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    color: "rgba(57, 56, 131, 1)",
    paddingRight: 5,
  },

  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
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

  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "rgba(245,245,245,1)",
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },
});
