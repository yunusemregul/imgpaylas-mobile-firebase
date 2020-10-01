import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Error from "../../modals/Error";
import colors from "../../styles/colors";
import style from "../../styles/style";

// Kayıt sayfası
export default function Register({ navigation, screenName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [errorScreenVisible, setErrorScreenVisible] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");

  let emailInput, passwordInput, passwordAgainInput;

  // belki daha iyi bir yöntem bulunabilir
  function showErrorScreen(message) {
    setErrorMesage(message);
    setErrorScreenVisible(true);
  }

  function register() {
    if (name.length == 0 || email.length == 0 || pass.length == 0) {
      showErrorScreen("Tüm alanlar doldurulmalıdır!");
      return;
    }

    if (pass.length < 6) {
      showErrorScreen("Şifre en az 6 karakterli olmalıdır!");
      return;
    }

    if (pass != passAgain) {
      showErrorScreen("Şifreler uyuşmuyor!");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: name,
            })
            .then((s) => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            });
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showErrorScreen("Bu e-posta adresi zaten kullanılıyor!");
          return;
        }

        if (error.code === "auth/invalid-email") {
          showErrorScreen("Geçersiz e-posta!");
          return;
        }

        showErrorScreen("Bilinmeyen hata!");
      });
  }

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
      <Text
        style={{
          fontSize: 25,
          color: colors.primary,
        }}
      >
        Üye Kaydı
      </Text>
      <TextInput
        style={style.textinput}
        placeholder="Ad"
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setName(text)}
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
        style={style.textinput}
        placeholder="E-posta"
        placeholderTextColor={colors.primary}
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
        style={style.textinput}
        placeholder="Şifre"
        placeholderTextColor={colors.primary}
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
        style={style.textinput}
        placeholder="Şifre Tekrarı"
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setPassAgain(text)}
        onSubmitEditing={() => {
          register();
        }}
      />
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
  );
}
