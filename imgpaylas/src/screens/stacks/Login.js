import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import Error from "../modals/Error";
import colors from "../styles/colors";
import style from "../styles/style";

// Giriş sayfası
export default function Login({ navigation, screenName }) {
  let passwordInput;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorScreenVisible, setErrorScreenVisible] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  const [isLoggingIn, setLoggingIn] = useState(false);

  // belki daha iyi bir yöntem bulunabilir
  function showErrorScreen(message) {
    console.log("Login error: " + message);
    setErrorMesage(message);
    setErrorScreenVisible(true);
    setLoggingIn(false);
  }

  function logIn() {
    setLoggingIn(true);
    console.log("Trying to log in.");
    if (email.length == 0 || pass.length == 0) {
      showErrorScreen("E-posta ya da şifre boş olamaz!");
      return;
    }

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
        showErrorScreen("E-posta ya da şifre hatalı!"); // şimdilik böyle genel bir hata
      });
  }

  function register() {
    navigation.navigate("Register");
  }

  if (isLoggingIn) return <Loading>Giriş yapılıyor...</Loading>;

  return (
    <View style={style.container}>
      <Error
        visible={errorScreenVisible}
        onClose={() => {
          setErrorScreenVisible(false);
        }}
      >
        {errorMesage}
      </Error>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 214, height: 64 }}
      />
      <TextInput
        autoCompleteType="email"
        style={{ ...style.textinput, marginTop: 32 }}
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
        style={style.textinput}
        onChangeText={(text) => {
          setPass(text);
        }}
        placeholder="Şifre"
        placeholderTextColor={colors.primary}
        onSubmitEditing={() => {
          logIn();
        }}
      />
      <CustomButton onPress={logIn}>Giriş</CustomButton>
      <Text
        style={{
          marginTop: 14,
          fontSize: 17,
          color: colors.primary,
          textDecorationLine: "underline",
        }}
      >
        Şifremi Unuttum
      </Text>
      <View style={{ position: "absolute", bottom: 32, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            ya da
          </Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <TouchableOpacity
          title="Kayıt Ol"
          style={{ ...style.button, backgroundColor: colors.important }}
          activeOpacity={1}
          onPress={() => {
            register();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
