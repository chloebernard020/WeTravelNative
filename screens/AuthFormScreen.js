import { React, useState, useEffect, useContext } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authenticateUser } from "../api/compteapi";
import AuthContext from "../AuthContext";

export const AuthFormScreen = () => {
  //Initiliasation des variables entrées par l'utilisateur
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // setAuthenticated et setUser pour actualiser quand l'utilisateur se connecte
  const { setAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  // Fonction permettant la connexion de l'utilisateur, on vérifie que l'utilisateur existe
  const handleLogin = async () => {
    try {
      let user = await authenticateUser(username, password);
      if (user == null) {
        Alert.alert(
          "Erreur de connexion",
          "Le nom d'utilisateur ou le mot de passe est incorrect."
        );
      } else {
        setAuthenticated(true);
        setUser(user);
        Alert.alert(
          "Connexion réussie",
          `Vous êtes maintenant connecté(e) en tant que ${user.prenom}.`
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur de connexion", "Impossible de se connecter.");
    }
  };

  // Permet d'aller sur la page permettant de renouveler le mot de passe
  const resetPassword = () => {
    navigation.navigate("AskMail");
  };

  const navigation = useNavigation();

  //Permet d'aller sur la page permettant l'inscription
  const signUp = () => {
    navigation.navigate("RegForm");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.formImage} source={require("../assets/logo.png")} />

      <Text style={styles.header}>Se connecter</Text>
      <Text style={styles.subheader}>Entrez votre adresse mail</Text>
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
          onChangeText={setUsername}
        />
      </View>
      <Text style={styles.subheader}>Entrez votre mot de passe</Text>
      <View style={styles.container2}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/ios/50/null/password1--v1.png",
          }}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Mot de passe"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={handleLogin}
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
    color: "rgba(57, 56, 131, 1)",
  },

  subheader: {
    fontSize: 15,
    marginBottom: 5,
    color: "rgba(69, 82, 152, 1)",
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

  notRegistered: {
    fontSize: 14,
    color: "rgba(146, 128, 154, 1)",
    marginBottom: 4,
  },
  register: {
    fontSize: 20,
    color: "rgba(186, 104, 163, 1)",
    fontWeight: "bold",
    marginBottom: 4,
  },
});
