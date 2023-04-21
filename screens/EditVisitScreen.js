import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { editVisite } from "../api/visiteapi";

const EditVisitScreen = ({ route, navigation }) => {
  const { visite } = route.params;
  const { place } = route.params;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  const editVisit = async () => {
    if (date) {
      try {
        await editVisite(visite.id, visite.lieuId, visite.compteId, date);
        navigation.navigate("VisitDetails", { visite });
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
            Date sélectionnée : {date.toLocaleDateString()}
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
        onPress={() => editVisit()}
      >
        <Text style={styles.loginText}>Modifier la visite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditVisitScreen;

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
