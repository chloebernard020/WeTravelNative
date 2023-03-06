import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { ButtonDiscover } from "../components/ButtonDiscover";

const EditPreferencesScreen = ({}) => {
  return <View></View>;
};

export default EditPreferencesScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    // fontFamily: "ArialRoundedMTBold",
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
