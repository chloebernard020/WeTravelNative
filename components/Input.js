import React from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";

// This component has two props: "name" and "age"
export const Input = ({
  imageUrl,
  placeholder,
  hideCharacters,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.inputIcon}
        source={{
          uri: imageUrl,
        }}
      />
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={hideCharacters}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "white",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
});
