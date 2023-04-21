import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { addAppreciation } from "../api/appreciationapi";
import AuthContext from "../AuthContext";

// On passe en props la route pour récupérer des éléments de l'autre écran et la navigation pour naviguer dans un écran de la même stack à la fin de l'exécution du code
const AddAppreciationScreen = ({ route, navigation }) => {
  const { place } = route.params;
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const today = new Date();

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const AddAppreciation = async () => {
    if (text != "") {
      try {
        await addAppreciation(user, place, today, text);
        navigation.navigate("Place", { place });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        Alert.alert("Vous n'avez pas entré de commentaire");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre appréciation</Text>
      <View style={styles.whiteLine} />

      <View style={styles.whiteSquare}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Qu'avez-vous pensé de {place.nom} ?</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Entrez votre commentaire ici..."
            value={text}
            onChangeText={handleTextChange}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={() => AddAppreciation()}
      >
        <Text style={styles.loginText}>Ajouter cette appréciation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAppreciationScreen;

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
    //fontFamily: "Roboto",
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
