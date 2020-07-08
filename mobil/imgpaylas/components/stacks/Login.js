import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.register = this.register.bind(this);
  }

  logIn() {
    console.log("login called");
  }

  register() {
    const {navigation} = this.props;
    console.log("register called");
    navigation.navigate("Register");
    navigation.navigate
  }

  render() {
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
            this.logIn();
          }}
        />
        <TouchableOpacity
          title="Giriş"
          style={styles.loginbutton}
          activeOpacity={1}
          onPress={() => {
            this.logIn();
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
          onPress={() => {this.register()}}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}

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
