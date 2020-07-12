import React from "react";
import { Image, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import style from "../styles/style";

export default function ImageBox(props) {
  return (
    <View style={style.imagebox}>
      <TouchableHighlight onPress={() => {}}>
        <Image
          source={{ uri: props.data.thumbnail }}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Beğen</Text>
      </TouchableHighlight>
    </View>
  );
}
