import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";
import ImageList from "../ImageList";

export default function Home({ navigation }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    const subscriber = firestore()
      .collection("images")
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setImages(data);
      });
    return subscriber;
  }, []);

  return (
    <View>
      <Text style={style.tabtitle}>Keşfet</Text>
      <ImageList data={images} />
    </View>
  );
}
