import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";
import ImageList from "../ImageList";

export default function Likes({ navigation }) {
  const [userLikes, setUserLikes] = useState([]);
  const [isDirty, setDirty] = useState(true);

  function updateUserLikes() {
    firestore()
      .collection("images")
      .where("likes", "array-contains", auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setUserLikes(data);

        setDirty(false);
      });
  }

  useEffect(() => {
    if (isDirty) {
      updateUserLikes();
    }

    const unsubscribe = navigation.addListener("focus", () => {
      updateUserLikes();
    });

    return unsubscribe;
  }, [navigation, isDirty]);

  return (
    <View>
      <Text style={style.tabtitle}>Beğendiklerin</Text>
      <ImageList
        data={userLikes}
        onChange={() => {
          setDirty(true);
        }}
      />
    </View>
  );
}
