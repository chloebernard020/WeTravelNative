import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
// This component has two props: "name" and "age"
export const Demande = ({ _key, compteDemandeur, onAccept, onDecline }) => {
  return (
    <View key={_key}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Image
          style={[styles.circlefriends, styles.circleContainerfriends]}
          source={require("../assets/empire.jpg")}
        />
        <Text style={styles.text2}>
          {compteDemandeur
            ? compteDemandeur.nom + " " + compteDemandeur.prenom
            : ""}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[styles.acceptButton, styles.buttonContainer]}
          title="Accepter"
          onPress={onAccept}
        >
          <Text style={styles.textButton}>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.refuseButton, styles.buttonContainer]}
          title="Refuser"
          onPress={onDecline}
        >
          <Text style={styles.textButton}>Refuser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Demande;
const styles = StyleSheet.create({
  circlefriends: {
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: "white",
    opacity: 0.8,
  },
  acceptButton: {
    backgroundColor: "rgba(86,141,172,1)",
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,

    width: 100,
    borderRadius: 10,
  },
  refuseButton: {
    backgroundColor: "rgb(233,85,85)",
  },
  textButton: { color: "white" },
  text2: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
    //fontFamily: "ArialRoundedMTBold",
    color: "rgba(57, 56, 131, 1)",
  },
});
