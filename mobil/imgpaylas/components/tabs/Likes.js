import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";
import ImageList from "../ImageList";

export default function Likes({ navigation }) {
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("images")
      .where("likes", "array-contains", auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setUserLikes(data);
      });

    return subscriber;
  }, []);

  return (
    <View>
      <Text style={style.tabtitle}>Beğendiklerin</Text>
      <ImageList data={userLikes} />
    </View>
  );
}
