import auth from "@react-native-firebase/auth";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TabTitle from "../TabTitle";
import style from "../../styles/style";
import colors from "../../styles/colors";

export default function Settings({ navigation }) {
  function logOff() {
    auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      });
  }

  return (
    <View>
      <TabTitle title="Ayarlar" />
      <TouchableOpacity
        style={{
          ...style.button,
          width: 312,
          backgroundColor: colors.negative,
          alignSelf: "center",
        }}
        activeOpacity={1}
        onPress={logOff}
      >
        <Text style={{ color: "white", fontSize: 17 }}>ÇIKIŞ YAP</Text>
      </TouchableOpacity>
    </View>
  );
}
