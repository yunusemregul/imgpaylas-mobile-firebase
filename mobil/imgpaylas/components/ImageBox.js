import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../styles/colors";
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
      <TouchableOpacity
        style={style.likescontainer}
        onPress={() => {
          if (!props.data.likes.includes(auth().currentUser.uid)) {
            firestore()
              .collection("images")
              .doc(props.id)
              .update({ likes: [...props.data.likes, auth().currentUser.uid] })
              .then(() => {
                props.onChange();
              });
          } else {
            firestore()
              .collection("images")
              .doc(props.id)
              .update({
                likes: props.data.likes.filter((val) => {
                  return val != auth().currentUser.uid;
                }),
              })
              .then(() => {
                props.onChange();
              });
          }
        }}
      >
        <Text
          style={{
            color: props.data.likes.includes(auth().currentUser.uid)
              ? colors.important
              : colors.white,
            marginLeft: 2,
            marginRight: 2,
            fontSize: 13,
          }}
        >
          {props.data.likes.length}
        </Text>
        <Image
          source={
            props.data.likes.includes(auth().currentUser.uid)
              ? require("../assets/images/icon_like_liked.png")
              : require("../assets/images/icon_like.png")
          }
          style={{ marginRight: 2, top: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
