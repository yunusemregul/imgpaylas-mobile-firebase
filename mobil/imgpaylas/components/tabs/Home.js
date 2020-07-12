import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";
import ImageList from "../ImageList";

export default function Home({ navigation }) {
  const [images, setImages] = useState({});
  const [isDirty, setDirty] = useState(true);

  function updateImages() {
    firestore()
      .collection("images")
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setImages(data);
        setDirty(false);
      });
  }

  useEffect(() => {
    if (isDirty) {
      updateImages();
    }

    const unsubscribe = navigation.addListener("focus", () => {
      updateImages();
    });

    return unsubscribe;
  }, [navigation, isDirty]);

  return (
    <View>
      <Text style={style.tabtitle}>Keşfet</Text>
      <ImageList
        data={images}
        onChange={() => {
          setDirty(true);
        }}
      />
    </View>
  );
}
