import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// This component has two props: "name" and "age"
export const ScrollFriends = ({ ami ,_key}) => {
  return (
    <View key={_key}>
      <TouchableOpacity>
        <Image
          style={styles.circlefriends}
          source={require("../assets/empire.jpg")}
        />
        <Text style={styles.text2}>
          {ami.nom} {ami.prenom}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScrollFriends;

const styles = StyleSheet.create({
  circlefriends: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: "white",
    opacity: 0.8,
  },
  text2: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
});
