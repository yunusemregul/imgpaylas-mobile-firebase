import React from "react";
import { View, Text } from "react-native";
import style from "../styles/style";

// Title for the tab pages (Discover, Likes, Profile)
export default function TabTitle(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 28,
        alignItems: "center",
      }}
    >
      <Text style={{ ...style.tabtitle, marginTop: 0 }}>{props.title}</Text>
      {props.children}
    </View>
  );
}
