import { React, useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { fetchVisitesParCompte, removeVisite } from "../api/visiteapi";
import { fetchLieu } from "../api/lieuxapi";
import { fetchVille } from "../api/villeapi";

import AuthContext from "../AuthContext";

const TravelsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [visites, setVisites] = useState([]); // initialisation du state pour les visites

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const visitesData = await fetchVisitesParCompte(user.id);
      setVisites(visitesData);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const loadVisites = async () => {
      const visitesData = await fetchVisitesParCompte(user.id); // appel à votre fonction d'appel API
      setVisites(visitesData); // mise à jour du state avec les données récupérées depuis l'API
    };
    loadVisites();
  }, []);

  const [lieux, setLieux] = useState([]);
  useEffect(() => {
    const loadLieux = async () => {
      const newLieux = await Promise.all(
        visites.map((visite) => fetchLieu(visite.lieuId))
      );
      setLieux(newLieux);
    };
    loadLieux();
  }, [visites]);

  const [villes, setVilles] = useState([]);
  useEffect(() => {
    const loadVilles = async () => {
      const newVilles = await Promise.all(
        lieux.map((lieu) => fetchVille(lieu.villeId))
      );
      setVilles(newVilles);
    };
    loadVilles();
  }, [visites]);

  // Initialisation de la fenêtre de dialogue
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = (visiteId) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer cette visite ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteVisit(visiteId);
          },
        },
        // Le bouton Non
        // Ne fait rien mais enlève le message
        {
          text: "Non",
        },
      ]
    );
  };

  // Fonction permettant la suppression de la visite lors de l'appui sur le bouton dédié
  const handleDeleteVisit = async (visiteId) => {
    setShowBox(false);
    await removeVisite(visiteId);
    const newVisitesData = await fetchVisitesParCompte(user.id);
    setVisites(newVisitesData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Mes visites</Text>
        <View style={styles.whiteLine} />
        <View>
          {visites.map((visite) => (
            <View key={visite.id} style={styles.white}>
              <Image
                style={styles.photo}
                source={{
                  uri: lieux.find((v) => v.id === visite.lieuId)?.photo,
                }}
              />
              <View>
                <Text style={styles.subheader}>
                  {lieux.find((v) => v.id === visite.lieuId)?.nom || ""},{" "}
                  {villes.find((v) => v.id === visite.lieuId)?.nom || ""}
                </Text>
                <Text style={styles.headdescription}>Date : {visite.date}</Text>
                <View style={styles.row}>
                  <View style={[styles.buttonContainer, styles.editButton]}>
                    <TouchableOpacity
                      title="Détails"
                      onPress={() =>
                        navigation.navigate("VisitDetails", { visite })
                      }
                    >
                      <Text style={styles.loginText}>Détails</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.buttonContainer, styles.deleteButton]}>
                    <TouchableOpacity
                      title="Supprimer"
                      onPress={() => {
                        showConfirmDialog(visite.id);
                      }}
                    >
                      <Text style={styles.loginText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TravelsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba( 239, 239, 250, 1)",
    height: 800,
  },

  header: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    color: "rgba(57, 56, 131, 1)",
  },

  whiteLine: {
    height: 2,
    marginTop: 5,
    marginBottom: 5,
    width: 380,
    backgroundColor: "white",
  },

  subheader: {
    fontSize: 18,
    marginTop: 5,
    color: "rgba(57, 56, 131, 1)",
  },

  headdescription: {
    fontSize: 14,
    marginTop: 5,
    color: "rgba(57, 56, 131, 1)",
  },

  row: { flexDirection: "row", justifyContent: "space-between" },

  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginRight: 10,
    width: 100,
    borderRadius: 10,
  },

  editButton: {
    backgroundColor: "rgba(86,141,172,1)",
  },

  deleteButton: {
    backgroundColor: "rgb(233,85,85)",
  },

  loginText: {
    color: "white",
  },

  white: {
    backgroundColor: "white",
    marginHorizontal: 10,

    width: 380,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "row",
  },

  photo: {
    width: 120,
    height: 120,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
