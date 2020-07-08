import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.register.bind(this);
  }

  register() {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  }

  render() {
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
          autoCompleteType="email"
          style={styles.textinput}
          placeholder="Ad"
          placeholderTextColor="#39375B"
          onSubmitEditing={() => {
            this.emailInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            this.emailInput = input;
          }}
          autoCompleteType="email"
          style={styles.textinput}
          placeholder="E-posta"
          placeholderTextColor="#39375B"
          onSubmitEditing={() => {
            this.passwordInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            this.passwordInput = input;
          }}
          autoCompleteType="password"
          secureTextEntry={true}
          style={styles.textinput}
          placeholder="Şifre"
          placeholderTextColor="#39375B"
          onSubmitEditing={() => {
            this.passwordAgainInput.focus();
          }}
        />
        <TextInput
          ref={(input) => {
            this.passwordAgainInput = input;
          }}
          autoCompleteType="password"
          secureTextEntry={true}
          style={styles.textinput}
          placeholder="Şifre Tekrarı"
          placeholderTextColor="#39375B"
          onSubmitEditing={() => {
            this.register();
          }}
        />
        <TouchableOpacity
          title="Kayıt Ol"
          style={styles.registerbutton}
          activeOpacity={1}
          onPress={() => {
            this.register();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    borderRadius: 32,
    height: 40,
  },
  registerbutton: {
    padding: 8,
    backgroundColor: "#E76F51",
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: 40,
  },
});
