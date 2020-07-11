import React from "react";
import { View, Text, Image } from "react-native";
import style from "../styles/style";

export default function ImageBox(props) {
  return (
    <View style={style.imagebox}>
      <Image source={{uri: props.image}} style={{width: "100%", height: "100%"}}/>
    </View>
  );
}
