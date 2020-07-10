import auth from "@react-native-firebase/auth";
import React from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";

export default function Home() {
  return (
    <View>
      <Text style={style.tabtitle}>Keşfet</Text>
      <Text>Hoş geldin {auth().currentUser.displayName}!</Text>
    </View>
  );
}
