import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { fetchCompte } from "../api/compteapi";
import { editCompte, removeCompte } from "../api/compteapi";

import AuthContext from "../AuthContext";

const EditProfileScreen = ({ navigation }) => {
  const { user, setAuthenticated } = useContext(AuthContext);
  const [compte, setCompte] = useState();
  const [nom, setNom] = useState(compte ? compte.nom : "");

  const [prenom, setPrenom] = useState(compte ? compte.prenom : "");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchCompte(user.id);
      setCompte(profile);
    };
    fetchData();
  }, [compte]);

  // Je sépare la modification des informations personnelles et la modification de mot de passe pour que ca soit plus simple
  const handleEditCompte = async () => {
    await editCompte(user.id, user.mail, nom, prenom, user.motDePasse);
    alert("Informations modifiées avec succès");
    navigation.navigate("Profile", { key: Math.random() });
  };

  const handleEditMDP = async () => {
    if (confirmationMotDePasse == motDePasse) {
      await editCompte(user.id, user.mail, user.nom, user.prenom, motDePasse);
      alert("Mot de passe modifié avec succès !");
      navigation.navigate("Profile", { key: Math.random() });
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  };

  // Variable permettant de montrer ou non la fenêtre de dialogue
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer votre compte ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteAccount(user.id);
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

  const handleDeleteAccount = async (id) => {
    setShowBox(false);
    await removeCompte(id);
    setAuthenticated(false);
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "rgba( 224, 222, 238, 1)",
        height: 1000,
      }}
    >
      <Text style={styles.text}>Modifier vos informations</Text>

      {
        /*On vérifie que le compte soit bien récupéré*/
        compte && (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setNom}
              value={nom}
              placeholder="Nom"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPrenom}
              value={prenom}
              placeholder="Prenom"
            />
          </View>
        )
      }

      <TouchableOpacity
        style={styles.button}
        title="Enregistrer"
        onPress={handleEditCompte}
      >
        <Text style={styles.textButton}>Enregistrer</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Modifier votre mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMotDePasse}
        value={motDePasse}
        placeholder="Nouveau mot de passe"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmationMotDePasse}
        value={confirmationMotDePasse}
        placeholder="Confirmez le nouveau mot de passe"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        title="Changer le mot de passe"
        onPress={handleEditMDP}
      >
        <Text style={styles.textButton}>Changer le mot de passe</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.buttonDeleteContainer, styles.deleteAccountButton]}
          onPress={showConfirmDialog}
        >
          <Text style={styles.textButton}>Supprimer le compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "rgba(86,141,172,1)",
    height: 40,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  textButton: {
    color: "white",
  },

  text: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
    color: "rgba(69, 82, 152, 1)",
  },

  buttonDeleteContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    width: 170,
    borderRadius: 15,
  },

  deleteAccountButton: {
    backgroundColor: "rgb(233,85,85)",
    marginTop: 40,
  },
});
