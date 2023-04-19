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
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { addAppreciation } from "../api/appreciationapi";
import AuthContext from "../AuthContext";

const AddAppreciationScreen = ({ route }) => {
  const navigation = useNavigation();
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
    // Masque le date picker une fois la date sélectionnée
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre appréciation</Text>
      <View style={styles.whiteLine} />

      <View style={styles.whiteSquare}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Qu'avez-vous pensé de {place.nom} ?</Text>
          <TextInput
            style={styles.input}
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
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
    alignItems: "center",
    height: 1000,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedDate: {
    marginBottom: 10,
  },

  contentContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    color: "rgba(57, 56, 131, 1)",
    paddingRight: 5,
  },

  header: {
    fontSize: 28,
    marginTop: 40,
    marginBottom: 5,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },
  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
    color: "rgba(69, 82, 152, 1)",
  },
  respoContainer: {
    flex: 1,
  },
  respoText: {
    textAlign: "right",
    fontSize: 14,
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
});
