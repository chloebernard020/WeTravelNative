import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { fetchLieux } from "../api/lieuxapi";
const AllPlacesScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        let displayedPlaces = await fetchLieux();
        if (searchName) {
          // Filter places by name
          displayedPlaces = displayedPlaces.filter((p) =>
            p.nom.toLowerCase().includes(searchName.toLowerCase())
          );
        }
        setPlaces(displayedPlaces);
      } catch (error) {
        console.log(error);
      }
    };
    loadPlaces();
  }, [searchName]);

  return (
    <View style={styles.container}>
      <View style={styles.containerResearch}>
        <TextInput
          style={styles.research}
          placeholder="Rechercher par nom ..."
          value={searchName}
          imageUrl="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/null/external-at-mail-dreamstale-lineal-dreamstale.png"
          onChangeText={handleSearchNameChange}
        />
        <View style={styles.searchIcon}>
          <Image source={require("../assets/loupe.png")} style={styles.icon} />
        </View>
      </View>
      <ScrollView>
        {places.map((place) => (
          <View key={place.id}>
            <View style={styles.mainContainer}>
              <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.titleText}>{place.nom}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText} numberOfLines={4}>
                    {place.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.signInButton]}
                  onPress={() => navigation.navigate("Place", { place })}
                >
                  <Text style={styles.loginText}>Découvrir</Text>
                </TouchableOpacity>
              </View>
              <Image style={styles.image} source={{ uri: place.photo }} />
            </View>
            <View style={styles.whiteLine} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 24,
    marginTop: 20,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },
  container: {
    backgroundColor: "rgba( 239, 239, 250, 1)",
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

  mainContainer: {
    height: 230,
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "rgba(245,245,245,1)",
  },
  contentContainer: {
    flex: 1,
    margin: 5,
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    color: "rgba(57, 56, 131, 1)",
    paddingRight: 5,
  },

  descriptionContainer: {
    flex: 7,
  },
  descriptionText: {
    color: "rgba(69, 82, 152, 1)",
  },
  respoContainer: {
    flex: 1,
  },
  respoText: {
    textAlign: "right",
    fontSize: 14,
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
  whiteLine: {
    height: 2,
    marginTop: 20,
    width: 380,
    backgroundColor: "white",
  },
});
