import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { addVisite } from "../api/visiteapi";
import AuthContext from "../AuthContext";

const AddVisitScreen = ({ route, navigation }) => {
  // Récupération du lieu dans la route
  const { place } = route.params;

  // Récupération du contexte lié au compte connecté
  const { user } = useContext(AuthContext);

  // Initialisation du date picker permettant de sélectionner une date
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Initialisation de la date sélectionnée à la date d'aujourd'hui
  const [date, setDate] = useState(new Date("2022-01-01"));

  // Fonction permettant de mettre à jour la date
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  const addVisit = async () => {
    if (date) {
      try {
        // Afficher une boîte de dialogue demandant si la personne veut ajouter une appréciation
        Alert.alert(
          "Ajouter une appréciation",
          "Voulez-vous ajouter une appréciation pour cette visite ?",
          [
            {
              text: "Oui",
              // Si la personne clique sur oui, on la redirige sur la page permettant d'ajouter une appréciation et on ajoute la visite
              onPress: async () => {
                await addVisite(user, place, date);
                navigation.navigate("AddAppreciation", { place });
              },
            },
            {
              text: "Non",
              // Si la personne clique sur non, on la redirige sur la page du lieu
              onPress: async () => {
                await addVisite(user, place, date);
                navigation.navigate("Place", { place });
              },
            },
          ]
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        Alert.alert("Vous n'avez pas sélectionné de date");
      } catch (error) {
        console.error(error);
      }
    }
    // Masque le date picker une fois la date sélectionnée
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre visite</Text>
      <View style={styles.whiteLine} />
      <View style={styles.whiteSquare}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Quand avez-vous visité {place.nom} ?</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.loginText}>Sélectionner une date</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Date sélectionnée : {date ? date.toLocaleDateString() : ""}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              maximumDate={new Date()} // désactive les dates futures
              onChange={onDateChange}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={() => addVisit()}
      >
        <Text style={styles.loginText}>Ajouter cette visite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddVisitScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
    alignItems: "center",
    height: 1000,
  },

  header: {
    fontSize: 28,
    marginTop: 40,
    marginBottom: 5,
    fontWeight: "bold",
    color: "rgba(57, 56, 131, 1)",
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },

  whiteSquare: {
    height: 200,
    width: 380,
    backgroundColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "rgba(167,166,169,1)",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    marginRight: 15,
    marginLeft: 15,

    marginHorizontal: 15,
    marginTop: 20,
  },

  contentContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 150,
    borderRadius: 30,
  },

  signInButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },
  loginText: {
    color: "white",
  },
});
