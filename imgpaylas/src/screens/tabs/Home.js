import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAllImages } from "../Datamanager";
import colors from "../styles/colors";
import ImageList from "../components/ImageList";
import TabTitle from "../components/TabTitle";
import Loading from "../components/Loading";

// Keşfet sayfası
export default function Home({ navigation }) {
  const [images, setImages] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = getAllImages().onSnapshot((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data();
      });
      setImages(data);
      setLoading(false);
    });
    return subscriber;
  }, []);

  if (isLoading) return <Loading />;

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
