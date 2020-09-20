import React from "react";
import { View, Text } from "react-native";
import style from "../styles/style";
import colors from "../styles/colors";

// Yükleniyor ekranı
export default function Loading(props) {
  return (
    <View style={style.container}>
      <Text style={{ fontSize: 17, color: colors.primary }}>
        {props.children || "Yükleniyor..."}
      </Text>
    </View>
  );
}
