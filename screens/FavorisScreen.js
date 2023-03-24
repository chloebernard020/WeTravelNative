import { React, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchFavorisParCompte } from "../api/favorisapi";
import { fetchLieu } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";
import AuthContext from "../AuthContext";
const VisitScreen = ({ route }) => {
  const { user } = useContext(AuthContext);
  const [favoris, setFavoris] = useState([]); // initialisation du state pour les visites
  const [searchName, setSearchName] = useState("");

  const handleSearchNameChange = (text) => {
    setSearchName(text);
  };
  useEffect(() => {
    const loadFavoris = async () => {
      const favorisData = await fetchFavorisParCompte(user.id); // appel à votre fonction d'appel API
      setFavoris(favorisData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadFavoris();
  }, []);

  const [lieux, setLieux] = useState([]);
  useEffect(() => {
    const loadLieux = async () => {
      const newLieux = await Promise.all(
        favoris.map((favori) => fetchLieu(favori.lieuId))
      );
      setLieux(newLieux);
    };
    loadLieux();
  }, [favoris]);

  const [heartIcon, setHeartIcon] = useState("heart");
  const [favorite, setFavorite] = useState();

  const handlePress = () => {
    setFavorite(!favorite);
    if (!favorite) {
      setHeartIcon("heart");
      onPress();
    } else {
      setHeartIcon("heart-outline");
    }
  };

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
      <Text style={styles.header}>Mes favoris</Text>
      <View style={styles.whiteLine} />

      {favoris.map((favori) => (
        <View key={favori.id} style={styles.white}>
          <Image
            style={styles.photo}
            source={{
              uri: lieux.find((v) => v.id === favori.lieuId)?.photo || "",
            }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.subheader}>
              {lieux.find((v) => v.id === favori.lieuId)?.nom || ""}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {lieux.find((v) => v.id === favori.lieuId)?.description || ""}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={handlePress}>
              <Ionicons name={heartIcon} size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default VisitScreen;

const styles = StyleSheet.create({
  scroll: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },

  subheader: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
  description: {
    fontSize: 14,
    marginRight: 30,
    marginBottom: 15,
    width: 200,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
  },

  white: {
    backgroundColor: "white",
    marginHorizontal: 10,

    width: 380,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
  },

  appreciation: {
    fontSize: 14,
    marginRight: 15,
    marginBottom: 10,
    //fontFamily: "ArialMT",
    color: "rgba(69, 82, 152, 1)",
    alignItems: "center",
  },

  icon: {
    color: "red",

    marginVertical: 5,
  },

  headdescription: {
    fontSize: 18,
    marginTop: 5,
    //fontFamily: "ArialMT",
    color: "rgba(57, 56, 131, 1)",
  },

  container: {
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
    height: 800,
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

  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
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
  whiteLine: {
    height: 2,
    marginTop: 5,
    marginBottom: 5,
    width: 380,
    backgroundColor: "white",
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 150,
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
