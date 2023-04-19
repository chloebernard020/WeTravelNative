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
import { Input } from "../components/Input";
import { fetchComptes, editCompte } from "../api/compteapi";

import { authenticateUser } from "../api/compteapi";
import AuthContext from "../AuthContext";

export const EditPasswordScreen = ({ route, navigation }) => {
  const { compte } = route.params;
  console.log(compte);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditPassword = async () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    } else {
      try {
        await editCompte(
          compte.id,
          compte.mail,
          compte.nom,
          compte.prenom,

          password
        );
        alert("Mot de passe modifié ! Vous pouvez maintenant vous connecter");
        navigation.navigate("AuthForm");
      } catch (error) {
        alert("Impossible de modifier le mot de passe : " + error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.formImage} source={require("../assets/logo.png")} />

      <Text style={styles.subheader}>Entrez un mot de passe</Text>
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
          keyboardType="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.subheader}>Confirmez le mot de passe</Text>
      <View style={styles.container2}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/ios/50/null/password1--v1.png",
          }}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Confirmation mot de passe"
          keyboardType="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={handleEditPassword}
      >
        <Text style={styles.loginText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba( 224, 222, 238, 1)",
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
  inputText: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
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
