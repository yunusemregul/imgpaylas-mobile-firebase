import React, { useState } from "react";
import { View, Text } from "react-native";
import style from "../styles/style";
import colors from "../styles/colors";

export default function ProgressBar(props) {
  const width = 292;

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 8,
        },
        shadowOpacity: 0.6,
        shadowRadius: 16.0,
        elevation: 16,
        borderRadius: 2,
        width: width,
        height: 40,
      }}
    >
      <View
        style={{
          backgroundColor: colors.important,
          width: (props.progress / 100) * (width - 2),
          height: 38,
          borderRadius: 2,
        }}
      ></View>
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          color: colors.primary,
          top: 10,
        }}
      >
        %{props.progress}
      </Text>
    </View>
  );
}
