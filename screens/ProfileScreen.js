import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import fetchcomptes from "../api/compteapi.js";
import { useContext } from "react";
import AuthContext from "../AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.textLeft}>
            Bonjour {user ? user.prenom : "Invité"}
          </Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.editButton]}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.loginText}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteLine} />
        <View style={styles.row}>
          <Text style={styles.textLeft}>Nom</Text>
          <Text style={styles.textRight}>{user.nom}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Prénom</Text>
          <Text style={styles.textRight}>{user.prenom}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Adresse mail</Text>
          <Text style={styles.textRight}>{user.mail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Mot de passe</Text>
          <Text style={styles.textRight}>{user.motDePasse}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  textLeft: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  whiteLine: {
    height: 2,
    alignContent: "center",
    width: 400,
    backgroundColor: "white",
  },
  textRight: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 30,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
    height: 900,
    //alignItems: "center",
  },

  photo: {
    width: 160,
    height: 160,
    marginBottom: 20,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 300,
    width: 350,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  lignehorizontal: {
    color: "white",
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    width: 100,
    borderRadius: 30,
  },

  editButton: {
    backgroundColor: "rgba(120,116,172,1)",
  },

  preferencesContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    width: 150,
    borderRadius: 10,
  },
  preferencesButton: {
    backgroundColor: "white",
  },
  preferencesText: {
    color: "rgba(69,82,152,1)",
  },

  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
