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
const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Bonjour, Test</Text>
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
          <Text style={styles.textRight}>Test</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Prénom</Text>
          <Text style={styles.textRight}>Test2</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Adresse mail</Text>
          <Text style={styles.textRight}>test@ensc.fr</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Mot de passe</Text>
          <Text style={styles.textRight}>********</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textLeft}>Mes préférences</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.editButton]}
            onPress={() => navigation.navigate("EditPreferences")}
          >
            <Text style={styles.loginText}>Modifier</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteLine} />
        <Text style={styles.textLeft}>Localisations :</Text>
        <View style={styles.row2}>
          <TouchableOpacity
            style={[styles.preferencesContainer, styles.preferencesButton]}
            //onPress={() => navigation.navigate("EditPreferences")}
          >
            <Text style={styles.localisationText}>Europe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.preferencesContainer, styles.preferencesButton]}
            //onPress={() => navigation.navigate("EditPreferences")}
          >
            <Text style={styles.localisationText}>Amérique du Sud</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textLeft}>Types de lieux : </Text>
        <View style={styles.row2}>
          <TouchableOpacity
            style={[styles.preferencesContainer, styles.preferencesButton]}
            //onPress={() => navigation.navigate("EditPreferences")}
          >
            <Text style={styles.localisationText}>Places</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.preferencesContainer, styles.preferencesButton]}
            //onPress={() => navigation.navigate("EditPreferences")}
          >
            <Text style={styles.localisationText}>Monuments historiques</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba( 226, 223, 231, 1)",
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
    backgroundColor: "rgba(186,104,163,1)",
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
