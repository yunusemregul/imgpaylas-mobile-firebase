import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "../../styles/style";

export default function Login({navigation, screenName}) {
  let passwordInput;

  function logIn() {
    console.log("login called");
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