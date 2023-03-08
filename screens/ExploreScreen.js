import { React, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ExploreScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher un lieu par nom, localisation, type de lieu..."
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
        />
        <View style={styles.whiteLine} />
        <View style={styles.row}>
          <Text style={styles.textLeft}>Lieux les plus appréciés</Text>
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
            <Text style={styles.text}>Empire State Building, New York</Text>
            <Image
              style={styles.photo}
              source={require("../assets/empire.jpg")}
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
            <Text style={styles.text}>CN Tower, Toronto</Text>
            <Image
              style={styles.photo}
              source={require("../assets/cntower.jpg")}
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
        <Text style={styles.header}>Découvrir la Suède</Text>
        <ScrollView horizontal style={styles.whiteSquare}>
          <View style={styles.scroll}>
            <Text style={styles.text}>Le palais royal, Stockholm</Text>
            <Image
              style={styles.photo}
              source={require("../assets/palaisroyal.jpg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <Text style={styles.text}>Øresundsbron, Malmö</Text>
            <Image
              style={styles.photo}
              source={require("../assets/Øresund.jpg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scroll}>
            <Text style={styles.text}>Liseberg, Göteborg</Text>
            <Image
              style={styles.photo}
              source={require("../assets/liseberg.jpg")}
            />
            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              onPress={() => navigation.navigate("Place")}
            >
              <Text style={styles.loginText}>Découvrir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  research: {
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 10,
    color: "rgba(100,100,100,1)",
    marginTop: 20,
    width: 350,
    height: 35,
  },
  scroll: {
    marginRight: 15,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    //fontFamily: "Roboto",
    color: "rgba(57, 56, 131, 1)",
  },

  textLeft: {
    fontSize: 18,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "bold",
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
    width: 380,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 20,
  },

  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
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
