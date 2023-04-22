import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export const FavoriteCard = ({ place }) => {
  return (
    <View style={styles.white}>
      <Image
        style={styles.photo}
        source={{
          uri: place.photo || "",
        }}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.subheader}>{place.nom}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {place.description}
        </Text>
      </View>
    </View>
  );
};

export default FavoriteCard;
const styles = StyleSheet.create({
  white: {
    backgroundColor: "white",
    marginHorizontal: 10,

    width: 410,
    marginBottom: 20,
    flexDirection: "row",
  },

  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  subheader: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  description: {
    fontSize: 14,
    marginRight: 30,
    marginBottom: 15,
    width: 200,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
});
