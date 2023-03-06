import { React, useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../components/Input";
import authenticateUser from "../api/compteapi";

export const AuthFormScreen = ({ navigation, onLoginSuccessful }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    const user = authenticateUser(login, password);
    let msg = user !== null ? "Connexion réussie" : "Erreur de connexion";
    msg += ` avec les identifiants : ${login + "/" + password}`;
    if (user !== null) onLoginSuccessful(user);
    else Alert.alert("Action sélectionnée", msg);
  };

  const resetPassword = () => {
    Alert.alert("Action sélectionnée", "Mise à jour du mot de passe");
  };
  const navigation2 = useNavigation();
  const signUp = () => {
    navigation2.navigate("ExploreStackNavigator", { screen: "ExploreScreen" });

    navigation.navigate("RegForm");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.formImage} source={require("../assets/logo.png")} />

      <Text style={styles.header}>Se connecter</Text>
      <Text style={styles.subheader}>Entrez votre adresse mail</Text>
      <Input
        placeholder="Email"
        imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
        hideCharacters={false}
        onChangeText={(text) => setLogin(text)}
      />
      <Text style={styles.subheader}>Entrez votre mot de passe</Text>
      <Input
        placeholder="Mot de passe"
        imageUrl="https://img.icons8.com/ios/50/null/password1--v1.png"
        hideCharacters={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={signIn}
      >
        <Text style={styles.loginText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={resetPassword}>
        <Text>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <Text style={styles.notRegistered}>Vous n'avez pas de compte ?</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={signUp}>
        <Text style={styles.register}>Inscrivez-vous</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },
  formImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  subheader: {
    fontSize: 15,
    marginBottom: 5,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  notRegistered: {
    fontSize: 14,
    //fontFamily: "ArialMT",
    color: "rgba(146, 128, 154, 1)",
    marginBottom: 4,
  },
  register: {
    fontSize: 16,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(186, 104, 163, 1)",
    marginBottom: 4,
  },
});