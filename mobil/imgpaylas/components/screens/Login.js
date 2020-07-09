import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/style";
import auth from "@react-native-firebase/auth";

export default function Login({ navigation, screenName }) {
  let passwordInput;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function logIn() {
    console.log("login called");
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User with email '" + email + "' logged in!");
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

  function register() {
    console.log("register called");
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 214, height: 64 }}
      />
      <Text
        style={{
          fontSize: 25,
          color: "#39375B",
          marginTop: 80,
        }}
      >
        Üye Girişi
      </Text>
      <TextInput
        autoCompleteType="email"
        style={styles.textinput}
        placeholder="E-posta"
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
      />
      <TextInput
        ref={(input) => {
          passwordInput = input;
        }}
        autoCompleteType="password"
        secureTextEntry={true}
        style={styles.textinput}
        onChangeText={(text) => {
          setPass(text);
        }}
        placeholder="Şifre"
        placeholderTextColor="#39375B"
        onSubmitEditing={() => {
          logIn();
        }}
      />
      <TouchableOpacity
        title="Giriş"
        style={styles.loginbutton}
        activeOpacity={1}
        onPress={() => {
          logIn();
        }}
      >
        <Text style={{ color: "#fff", fontSize: 17 }}>Giriş</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 14, fontSize: 17, color: "#39375B" }}>
        ya da
      </Text>
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
