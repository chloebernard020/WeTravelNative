import { React, useState, useEffect } from "react";
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
import { fetchVisitesParCompte } from "../api/visiteapi";

const TravelsScreen = ({ navigation, idcompte }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const loadVisites = async () => {
      try {
        const displayedVisits = await fetchVisitesParCompte(idcompte);
        setVisits(displayedVisits);
      } catch (error) {
        console.log(error);
      }
    };
    loadVisites();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerResearch}>
          <TextInput
            style={styles.research}
            placeholder="La tour eiffel ..."
            imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          />
          <View style={styles.searchIcon}>
            <Image
              source={require("../assets/loupe.png")}
              style={styles.icon}
            />
          </View>
        </View>

        <Text style={styles.header}>Mes visites</Text>
        <View style={styles.whiteLine} />
        {visits.length === 0 ? (
          <View style={styles.noVisitsContainer}>
            <Text style={styles.noVisitsText}>
              Vous n'avez encore visité aucun lieu.
            </Text>
          </View>
        ) : (
          visits.map((visit, index) => (
            <View key={index} style={styles.row}>
              {/*<Image style={styles.photo} source={{ uri: visit.photo }} />*/}
              <View style={styles.content}>
                <Text style={styles.text}>{visit.nom}</Text>
                <Text style={styles.date}>Date : {visit.date}</Text>
                {/*<Text style={{ flex: 1, flexWrap: "wrap" }}>
                  Appréciation : {visit.comment}
            </Text>*/}

                <TouchableOpacity
                  style={[styles.buttonContainer, styles.signInButton]}
                  onPress={() => navigation.navigate("Visit")}
                >
                  <Text style={styles.loginText}>En savoir plus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default TravelsScreen;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "",
    marginTop: 10,
    backgroundColor: "rgba(245,245,245,1)",
    width: 380,
    height: 150,
    borderRadius: 8,
  },
  containerResearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 50,
    width: 380,
    shadowColor: "rgba(270,270,270,1)",
    borderRadius: 20,
    marginVertical: 10,
    marginLeft: 5,
    //borderWidth: 1,
    //borderColor: "#ccc",
  },

  research: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    color: "#000",
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
    backgroundColor: "rgba(120,116,172,1)",
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

  date: {
    fontSize: 14,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
  },

  content: {
    marginLeft: 10,
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
