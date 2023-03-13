import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const PlacesItem = ({ lieu, navigation }) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{lieu.nom}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} numberOfLines={4}>
              {lieu.description}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() => navigation.navigate(PlaceScreen(lieu))}
          >
            <Text style={styles.loginText}>Découvrir</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.image} source={{ uri: lieu.photo }} />
      </View>
      <View style={styles.whiteLine} />
    </View>
  );
};

export default PlacesItem;

const styles = StyleSheet.create({
  mainContainer: {
    height: 230,
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "rgba(245,245,245,1)",
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
  respoContainer: {
    flex: 1,
  },
  respoText: {
    textAlign: "right",
    fontSize: 14,
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
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
});
