import React from "react";
import { View, Text } from "react-native";
import style from "../styles/style";

export default function Loading() {
  return (
    <View style={style.container}>
      <Text>Yükleniyor...</Text>
    </View>
  );
}
