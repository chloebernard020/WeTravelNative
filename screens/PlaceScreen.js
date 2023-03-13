import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { fetchLieu } from "../api/lieuxapi";

const PlaceScreen = ({ lieu }) => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const getPlaceDetails = async () => {
      const placeDetails = await fetchLieu(lieu.id);
      setPlace(placeDetails);
    };
    getPlaceDetails();
  }, []);

  const infos = place[0];
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{infos.nom ? infos.nom : ""}</Text>
        <Text style={styles.subheader}>
          {infos.villeId ? infos.villeId : ""}
        </Text>
        <Image style={styles.photo} source={{ uri: infos.photo }} />
        <View style={styles.whiteLine} />
        <Text style={styles.headdescription}>Description</Text>

        <Text style={styles.description}>{infos.description}</Text>
        <View style={styles.whiteLine} />
        <Text style={styles.headdescription}>Appréciations</Text>

        <Text style={styles.appreciation}>Compte : test</Text>
        <Text style={styles.appreciation}>Date : 04/02/2023</Text>
        <Text style={styles.appreciation}>Commentaire : J'ai adoré !</Text>
        <View style={styles.whiteLine} />
        <Text style={styles.headdescription}>Point culture</Text>
        <Text style={styles.appreciation}>Ici des anecdotes </Text>
        <View style={styles.whiteLine} />
        <TouchableOpacity style={[styles.buttonContainer, styles.signInButton]}>
          <Text style={styles.loginText}>J'ai visité ce lieu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
