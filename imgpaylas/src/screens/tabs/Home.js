import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ImageList from "../../components/ImageList";
import Loading from "../../components/Loading";
import TabTitle from "../../components/TabTitle";
import { getAllImages } from "../../Datamanager";
import colors from "../../styles/colors";

// Home screen (aka 'discover new pics' screen)
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
