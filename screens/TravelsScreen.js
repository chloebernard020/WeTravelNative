import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const TravelsScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher une visite par nom, date..."
        />

        <Text style={styles.header}>Mes visites</Text>
        <View style={styles.whiteLine} />
        <View style={styles.row}>
          <Image
            style={styles.photo}
            source={require("../assets/toureiffel.jpeg")}
          />
          <View style={styles.content}>
            <Text style={styles.text}>La Tour Eiffel, Paris</Text>
            <Text>Date : 06/03/2023</Text>
            <Text style={{ flex: 1, flexWrap: "wrap" }}>
              Appréciation : Vous n'avez rien posté
            </Text>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              //onPress={signIn}
            >
              <Text style={styles.loginText}>En savoir plus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.photo}
            source={require("../assets/boverie.jpg")}
          />
          <View style={styles.content}>
            <Text style={styles.text}>La Boverie, Liège</Text>
            <Text>Date : 26/02/2023</Text>
            <Text style={{ flex: 1, flexWrap: "wrap" }}>
              Appréciation : Vous n'avez rien posté
            </Text>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              //onPress={signIn}
            >
              <Text style={styles.loginText}>En savoir plus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.photo}
            source={require("../assets/toureiffel.jpeg")}
          />
          <View style={styles.content}>
            <Text style={styles.text}>La Tour Eiffel, Paris</Text>
            <Text>Date : 06/02/2023</Text>
            <Text style={{ flex: 1, flexWrap: "wrap" }}>
              Appréciation : Vous n'avez rien posté
            </Text>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              //onPress={signIn}
            >
              <Text style={styles.loginText}>En savoir plus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.photo}
            source={require("../assets/boverie.jpg")}
          />
          <View style={styles.content}>
            <Text style={styles.text}>La Boverie, Liège</Text>
            <Text>Date : 06/01/2023</Text>
            <Text style={{ flex: 1, flexWrap: "wrap" }}>
              Appréciation : Vous n'avez rien posté
            </Text>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.signInButton]}
              //onPress={signIn}
            >
              <Text style={styles.loginText}>En savoir plus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TravelsScreen;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "rgba(245,245,245,1)",
    width: 380,
    height: 150,
    borderRadius: 8,
  },
  research: {
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 10,
    color: "rgba(100,100,100,1)",
    marginTop: 20,
    width: 380,
    height: 35,
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
  },
  signInButton: {
    backgroundColor: "rgba(186,104,163,1)",
  },
  loginText: {
    color: "white",
  },
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "rgba(57, 56, 131, 1)",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba( 226, 223, 231, 1)",
  },

  content: {
    //alignItems: "center",
    marginLeft: 5,
  },

  photo: {
    width: 150,
    height: 130,
    marginLeft: 10,
    borderRadius: 10,
  },
  whiteSquare: {
    height: 300,
    width: 380,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },

  whiteLine: {
    height: 2,
    marginTop: 10,
    width: 380,
    backgroundColor: "white",
  },
});
