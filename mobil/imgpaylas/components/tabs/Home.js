import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAllImages } from "../../Datamanager";
import colors from "../../styles/colors";
import style from "../../styles/style";
import ImageList from "../ImageList";
import TabTitle from "../TabTitle";

export default function Home({ navigation }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    const subscriber = getAllImages().onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data();
      });
      setImages(data);
    });
    return subscriber;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TabTitle title="Keşfet" />
      {Object.keys(images).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey yüklenmedi.
        </Text>
      ) : (
        <ImageList data={images} />
      )}
    </View>
  );
}
