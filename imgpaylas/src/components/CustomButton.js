import React from "react";
import { TouchableOpacity, Text } from "react-native";
import style from "../styles/style";

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      style={{
        ...style.button,
        ...props.buttonStyle,
      }}
      activeOpacity={1}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          fontSize: 17,
          ...props.textStyle,
        }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}
