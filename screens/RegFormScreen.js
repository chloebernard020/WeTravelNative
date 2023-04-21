import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import { addCompte, fetchComptes } from "../api/compteapi";
import Input from "../components/Input";

export const RegFormScreen = ({ navigation }) => {
  // On initialise les informations rentrées par l'utilisateur
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  // Fonction permettant l'inscription
  const register = async () => {
    // On vérifie que le mot de passe et la confirmation sont identiques
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    } else {
      // Si c'est le cas on ajoute le compte créé à l'API
      try {
        const comptes = await fetchComptes();
        const emailExists = comptes.some((compte) => compte.mail === mail);
        console.log(emailExists);
        if (emailExists == false) {
          console.log(emailExists);
          await addCompte(nom, prenom, mail, password);
          alert("Inscription réussie ! Vous pouvez maintenant vous connecter");
          navigation.navigate("AuthForm");
        } else {
          alert("L'email est déjà utilisé par un autre compte.");
        }
      } catch (error) {
        alert("Impossible de s'inscrire : " + error.message);
      }
    }
  };

  const signIn = () => {
    navigation.navigate("AuthForm");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.formImage}
          source={require("../assets/logo.png")}
        />
        <Text style={styles.header}>Bienvenue sur WeTravel</Text>
        <Text style={styles.header}>S'inscrire</Text>
        <Text style={styles.subheader}>Entrez une adresse mail</Text>
        <Input
          placeholder="Email"
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          hideCharacters={false}
          onChangeText={(text) => setMail(text)}
        />
        <Text style={styles.subheader}>Entrez vote nom</Text>
        <Input
          placeholder="Nom"
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          hideCharacters={false}
          onChangeText={(text) => setNom(text)}
        />
        <Text style={styles.subheader}>Entrez vote prénom</Text>
        <Input
          placeholder="Prénom"
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          hideCharacters={false}
          onChangeText={(text) => setPrenom(text)}
        />
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
          onPress={register}
        >
          <Text style={styles.loginText}>S'inscrire</Text>
        </TouchableOpacity>
        <Text style={styles.notRegistered}>Vous avez déjà un compte ?</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
          <Text style={styles.register}>Connectez-vous</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
