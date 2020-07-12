import React from "react";
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import style from "../styles/style";
import colors from "../styles/colors";

export default function ImageBox(props) {
  return (
    <View style={style.imagebox}>
      <TouchableHighlight onPress={() => {}}>
        <Image
          source={{ uri: props.data.thumbnail }}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableHighlight>
      <TouchableOpacity
        style={style.likescontainer}
        onPress={() => {
          console.log("ada");
        }}
      >
        <Text
          style={{
            color: colors.white,
            marginLeft: 2,
            marginRight: 2,
            fontSize: 13,
          }}
        >
          {props.data.likes}
        </Text>
        <Image
          source={require("../assets/images/icon_like.png")}
          style={{ marginRight: 2, top: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
