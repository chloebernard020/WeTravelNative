import { React, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { fetchVisitesParCompte } from "../api/visiteapi";

const VisitScreen = ({ route }) => {
  const { id } = route.params;
  const [visites, setVisites] = useState([]); // initialisation du state pour les visites

  useEffect(() => {
    const loadVisites = async () => {
      const visitesData = await fetchVisitesParCompte(id); // appel à votre fonction d'appel API
      setVisites(visitesData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadVisites();
  }, []);
  return (
    <View style={styles.container}>
      {visites.map((visite) => (
        <View key={visite.id}>
          <Text style={styles.header}>{visite.nom}</Text>
          <Text style={styles.subheader}>
            {visite.ville}, {visite.pays}
          </Text>
          {/*<Image style={styles.photo} source={{ uri: visite.photo }} />*/}
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Description</Text>
          <Text style={styles.description}>{visite.description}</Text>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Mon appréciation</Text>
          {visite.appreciations.length > 0 && (
            <View>
              <Text style={styles.appreciation}>
                Date : {visite.appreciations[0].date}
              </Text>
              <Text style={styles.appreciation}>
                Commentaire : {visite.appreciations[0].commentaire}
              </Text>
            </View>
          )}
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Mes photos</Text>
          {visite.photos.map((photo) => (
            <Image
              key={photo.id}
              style={styles.photo}
              source={{ uri: photo.url }}
            />
          ))}
          <View style={styles.whiteLine} />
        </View>
      ))}
    </View>
  );
};

export default VisitScreen;

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
