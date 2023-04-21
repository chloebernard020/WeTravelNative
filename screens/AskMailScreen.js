import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { fetchComptes } from "../api/compteapi";

export const AskMailScreen = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [comptes, setComptes] = useState([]);
  const [compte, setCompte] = useState([]);
  useEffect(() => {
    const loadComptes = async () => {
      const comptesData = await fetchComptes(); // appel à votre fonction d'appel API
      setComptes(comptesData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadComptes();
    const compte = comptes.find((compte) => compte.mail === mail);
    console.log(compte);
    setCompte(compte);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.formImage} source={require("../assets/logo.png")} />

      <Text style={styles.header}>Quel est votre adresse mail ?</Text>
      <View style={styles.container2}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png",
          }}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={false}
          onChangeText={setMail}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={() => navigation.navigate("EditPassword", { compte })}
      >
        <Text style={styles.loginText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AskMailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 224, 222, 238, 1)",
  },

  formImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  header: {
    fontSize: 28,
    marginBottom: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  container2: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "white",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },

  inputText: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },
  loginText: {
    color: "white",
  },
});
