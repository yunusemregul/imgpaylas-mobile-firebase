import React, { Component } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../../App";
import { StatusBar } from "expo-status-bar";

export default class Login extends Component {
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
            marginTop: 90,
          }}
        >
          Üye Girişi
        </Text>
        <TextInput
          autoCompleteType="email"
          style={styles.textinput}
          placeholder="E-posta"
          placeholderTextColor="#39375B"
        />
        <TextInput
          autoCompleteType="password"
          secureTextEntry={true}
          style={styles.textinput}
          placeholder="Şifre"
          placeholderTextColor="#39375B"
        />
        <TouchableOpacity
          title="Giriş"
          style={styles.loginbutton}
          activeOpacity={1}
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
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Kayıt Ol</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}
