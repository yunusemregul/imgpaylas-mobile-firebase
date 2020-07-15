import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../styles/colors";
import styles from "../../styles/style";

// Giriş sayfası
export default function Login({ navigation, screenName }) {
  let passwordInput;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function logIn() {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("User with email '" + email + "' logged in!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {
        // TODO: Hataları düzgün şekilde gösterebilmek
        console.log(error);
        console.log(error.code);
        if (error.code == "auth/invalid-email") {
          console.log("this does not print");
        }
        if (error.code == "auth/ınvalıd-emaıl") {
          console.log("this prints");
        }

        //console.error(error);
      });
  }

  function register() {
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
          color: colors.primary,
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
        placeholderTextColor={colors.primary}
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
        placeholderTextColor={colors.primary}
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
      <Text style={{ marginTop: 14, fontSize: 17, color: colors.primary }}>
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
