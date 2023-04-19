import { React, useEffect, useState, useContext } from "react";
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
import { fetchVille } from "../api/villeapi";
import { fetchAppreciationsParLieu } from "../api/appreciationapi";
import { fetchPays } from "../api/paysapi";
import AuthContext from "../AuthContext";

const VisitDetailsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const { visite } = route.params;
  const [place, setPlace] = useState([]);
  const [ville, setVille] = useState([]);
  const [pays, setPays] = useState([]);
  const [appreciations, setAppreciations] = useState([]);
  const [appreciation, setAppreciation] = useState([]);
  const [updatedVisite, setUpdatedVisite] = useState(visite);

  useEffect(() => {
    const getVisiteDetails = async () => {
      const placeDetails = await fetchLieu(visite.lieuId);
      setPlace(placeDetails);

      const villeDetails = await fetchVille(placeDetails.villeId);
      setVille(villeDetails);

      const paysDetails = await fetchPays(villeDetails.paysId);
      setPays(paysDetails);

      const appreciationsDetails = await fetchAppreciationsParLieu(
        visite.lieuId
      );
      setAppreciations(appreciationsDetails);

      if (user) {
        const Appreciation = appreciationsDetails.find(
          (appreciation) => appreciation.compteId === user.id
        );
        setAppreciation(Appreciation);
      }
    };
    getVisiteDetails();
  }, [appreciations]);

  const onSave = (newDate) => {
    setUpdatedVisite({ ...updatedVisite, date: newDate });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: place.photo }} />
        <View style={styles.informations}>
          <View>
            <Text style={styles.header}>{place.nom ? place.nom : ""}</Text>
            <Text style={styles.subheader}>
              {ville.nom ? ville.nom : ""}, {pays.nom ? pays.nom : ""}
            </Text>
          </View>
          <View style={styles.whiteLine} />

          <Text style={styles.headdescription}>Description</Text>

          <Text style={styles.description}>{place.description}</Text>
          <View style={styles.whiteLine} />
          <Text style={styles.headdescription}>Votre visite</Text>

          <Text style={styles.description}>
            Vous avez visité {place.nom} le : {visite.date}
          </Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() =>
              navigation.navigate("EditVisit", {
                visite: updatedVisite,
                place,
                onSave,
              })
            }
          >
            <Text style={styles.loginText}>Modifier la date</Text>
          </TouchableOpacity>
          <Text style={styles.headdescription}>Votre appréciation</Text>

          {appreciation ? (
            <View style={styles.whiteSquare}>
              <View style={styles.scroll}>
                <Text style={styles.text}>{user.mail}</Text>
                <Text style={styles.text}>{appreciation.date}</Text>

                <Text style={styles.text}>{appreciation.commentaire}</Text>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.text}>
                Vous n'avez pas posté d'appréciation pour ce lieu
              </Text>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.signInButton]}
                onPress={() =>
                  navigation.navigate("AddAppreciation", { place })
                }
              >
                <Text style={styles.loginText}>Ajouter une appréciation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default VisitDetailsScreen;

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 30,
    marginVertical: 10,
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
  },

  photo: {
    width: 420,
    height: 250,
    marginBottom: 5,

    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 10,
  },
  whiteSquare: {
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
