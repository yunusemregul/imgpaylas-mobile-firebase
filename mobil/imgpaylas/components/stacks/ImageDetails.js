import React from "react";
import { View, Image, Text } from "react-native";
import colors from "../../styles/colors";
import auth from "@react-native-firebase/auth";

export default function ImageDetails({ route, navigation }) {
  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 480,
        }}
      >
        <Image
          source={{ uri: route.params.data.url }}
          style={{ flex: 1, width: undefined, height: undefined }}
        />
      </View>
      <Text
        style={{
          color: colors.primary,
          fontSize: 27,
          fontWeight: "bold",
          marginLeft: 12,
          marginTop: 8,
        }}
      >
        Yunus Emre
      </Text>
      <Text style={{ color: colors.primary, fontSize: 19, marginLeft: 12 }}>
        {new Date(route.params.data.timestamp).toString()}
      </Text>
      <View
        style={{
          position: "absolute",
          top: 480,
          right: 5,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: route.params.data.likes.includes(auth().currentUser.uid)
              ? colors.important
              : colors.primary,
            marginLeft: 2,
            marginRight: 2,
            fontSize: 27,
            fontWeight: "bold",
          }}
        >
          {route.params.data.likes.length}
        </Text>
        <Image
          source={
            route.params.data.likes.includes(auth().currentUser.uid)
              ? require("../../assets/images/icon_likes_focused.png")
              : require("../../assets/images/icon_likes.png")
          }
          style={{
            marginRight: 2,
            top: 1,
            width: 27,
            height: 27,
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
}
