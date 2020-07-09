import auth from "@react-native-firebase/auth";
import React from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";

export default function Home() {
  return (
    <View style={style.container}>
      <Text>Hoş geldin {auth().currentUser.displayName}!</Text>
    </View>
  );
}
