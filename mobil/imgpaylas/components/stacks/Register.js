import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";

export default function Register() {
  const [mail, setEmail] = useState("");
  const [pass, setPass] = useState("");

  let emailInput, passwordInput, passwordAgainInput;

  function register() {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          color: "#39375B",
        }}
      >
        Üye Kaydı
      </Text>
      <TextInput
        style={styles.textinput}
        placeholder="Ad"
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          emailInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          emailInput = input;
        }}
        onChangeText={(text) => setEmail(text)}
        autoCompleteType="email"
        style={styles.textinput}
        placeholder="E-posta"
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordInput = input;
        }}
        onChangeText={(text) => setPass(text)}
        autoCompleteType="password"
        secureTextEntry={true}
        style={styles.textinput}
        placeholder="Şifre"
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          passwordAgainInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordAgainInput = input;
        }}
        autoCompleteType="password"
        secureTextEntry={true}
        style={styles.textinput}
        placeholder="Şifre Tekrarı"
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          register();
        }}
      />
      <TouchableOpacity
        title="Kayıt Ol"
        style={styles.registerbutton}
        activeOpacity={1}
        onPress={() => {
          register();
        }}
      >
        <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

// TODO: style ları ortak bir yerden al
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    marginTop: 14,
    color: "#39375B",
    fontSize: 17,
    borderColor: "#39375B",
    width: 245,
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
  },
  loginbutton: {
    padding: 8,
    backgroundColor: "#39375B",
    marginTop: 32,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
  registerbutton: {
    padding: 8,
    backgroundColor: "#E76F51",
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 40,
  },
});
