import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { ButtonDiscover } from "../components/ButtonDiscover";

const PlaceScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Empire State building</Text>
      <Text style={styles.subheader}>New York, Etats-Unis</Text>
      <Image style={styles.photo} source={require("../assets/empire.jpg")} />
      <View style={styles.whiteLine} />
      <Text style={styles.headdescription}>Description</Text>

      <Text style={styles.description}>
        L’Empire State Building est un gratte-ciel de style Art déco situé dans
        l'arrondissement de Manhattan, à New York. Il est situé dans le quartier
        de Midtown au 350 de la 5ᵉ Avenue, entre les 33ᵉ et 34ᵉ rues.
      </Text>
      <View style={styles.whiteLine} />
      <Text style={styles.headdescription}>Appréciations</Text>

      <Text style={styles.appreciation}>Compte : test</Text>
      <Text style={styles.appreciation}>Date : 04/02/2023</Text>
      <Text style={styles.appreciation}>Commentaire : J'ai adoré !</Text>
      <View style={styles.whiteLine} />
      <TouchableOpacity style={[styles.buttonContainer, styles.signInButton]}>
        <Text style={styles.loginText}>J'ai visité ce lieu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  subheader: {
    fontSize: 20,
    marginTop: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  description: {
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  appreciation: {
    fontSize: 14,
    marginRight: 15,
    marginBottom: 10,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
    alignItems: "center",
  },

  headdescription: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(57, 56, 131, 1)",
  },

  container: {
    alignItems: "center",
    backgroundColor: "rgba( 226, 223, 231, 1)",
    height: 800,
  },

  photo: {
    width: 250,
    height: 170,
    marginBottom: 20,
    marginTop: 10,
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
    marginTop: 5,
    marginBottom: 5,
    width: 380,
    backgroundColor: "white",
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 150,
    borderRadius: 30,
  },
  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
    width: 150,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
});
