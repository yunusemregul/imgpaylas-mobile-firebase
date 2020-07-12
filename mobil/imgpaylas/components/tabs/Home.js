import database from "@react-native-firebase/database";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../../styles/style";
import ImageList from "../ImageList";

export default function Home() {
  const [images, setImages] = useState({});

  useEffect(() => {
    database()
      .ref("/images")
      .on("value", (snapshot) => {
        let data = snapshot.val() ? snapshot.val() : {};
        setImages(data);
      });
  }, []);

  return (
    <View>
      <Text style={style.tabtitle}>Keşfet</Text>
      <ImageList data={images} />
    </View>
  );
}
