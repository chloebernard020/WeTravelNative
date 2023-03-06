import { React, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const ExploreScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.whiteLine} />
        <View style={styles.row}>
          <Text style={styles.textLeft}>Découvrir</Text>
          <TouchableOpacity
            style={[styles.buttonContainer2, styles.signInButton]}
            onPress={() => navigation.navigate("AllPlaces")}
          >
            <Text style={styles.loginText}>Voir tous les lieux</Text>
            {/*A redéplacer*/}
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.whiteSquare}>
          <View style={styles.scroll}>
            <Text style={styles.text}>La Boverie, Liège</Text>
            <Image
              style={styles.photo}
              source={require("../assets/boverie.jpg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <Text style={styles.text}>La Tour Eiffel, Paris</Text>
            <Image
              style={styles.photo}
              source={require("../assets/toureiffel.jpeg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <Text style={styles.text}>Basilique Saint-Francois..., Lima</Text>
            <Image
              style={styles.photo}
              source={require("../assets/stfrancois.jpg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.whiteLine} />
        <Text style={styles.header}>Filtrer votre recherche</Text>

        <View style={styles.whiteSquare}>
          <Text style={styles.textLeft}>Localisation</Text>
          <Text style={styles.textLeft}>Type de lieu</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  textLeft: {
    fontSize: 18,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 226, 223, 231, 1)",
    alignItems: "center",
  },

  photo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 250,
    width: 350,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 20,
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 350,
    backgroundColor: "white",
  },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
  },
  buttonContainer2: {
    height: 40,
    justifyContent: "center",
    marginTop: 5,
    alignItems: "center",
    width: 150,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
});
