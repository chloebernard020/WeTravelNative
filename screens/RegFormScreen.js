import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input } from "../components/Input";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const RegFormScreen = ({ navigation }) => {
  const onEmailChange = (email) => {
    Alert.alert(email);
  };

  const _onPressButton = () => {
    Alert.alert("Bien joué !");
  };

  const signIn = () => {
    navigation.navigate("AuthForm");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.formImage} source={require("../assets/logo.png")} />
      <Text style={styles.header}>Bienvenue sur WeTravel</Text>
      <Text style={styles.header}>S'inscrire</Text>
      <Text style={styles.subheader}>Entrez une adresse mail</Text>
      <Input
        placeholder="Email"
        imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
        hideCharacters={false}
        //onChangeText={(text) => setLogin(text)}
      />
      <Text style={styles.subheader}>Entrez un mot de passe</Text>
      <Input
        placeholder="Mot de passe"
        imageUrl="https://img.icons8.com/ios/50/null/password1--v1.png"
        hideCharacters={true}
        //onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.subheader}>Confirmez le mot de passe</Text>
      <Input
        placeholder="Confirmation mot de passe"
        imageUrl="https://img.icons8.com/ios/50/null/password1--v1.png"
        hideCharacters={true}
        //onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        //onPress={signIn}
      >
        <Text style={styles.loginText}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={styles.notRegistered}>Vous avez déjà un compte ?</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
        <Text style={styles.register}>Connectez-vous</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegFormScreen;
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
    fontSize: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(186, 104, 163, 1)",
    fontWeight: "bold",
    marginBottom: 4,
  },
});
