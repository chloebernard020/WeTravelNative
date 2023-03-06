import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const PlacesItem = ({ lieu }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{lieu.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{lieu.description}</Text>
        </View>
      </View>
      {/*<Image style={styles.image} source={{ uri: lieu.imageUrl }} />*/}
    </View>
  );
};

export default PlacesItem;

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 120,
    height: 150,
    margin: 5,
    borderRadius: 30,
    backgroundColor: "lightgray",
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
    paddingRight: 5,
  },
  anneeText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
    fontStyle: "italic",
    color: "#666666",
  },
  respoContainer: {
    flex: 1,
  },
  respoText: {
    textAlign: "right",
    fontSize: 14,
  },
});
