import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Input } from "../components/Input";
import { addCompte } from "../api/compteapi";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { fetchComptes } from "../api/compteapi";
export const RegFormScreen = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const register = async () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    } else {
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
