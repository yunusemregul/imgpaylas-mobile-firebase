import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ImageList from "../components/ImageList";
import Loading from "../components/Loading";
import TabTitle from "../components/TabTitle";
import { getUserLikes } from "../Datamanager";
import colors from "../styles/colors";

// Beğendiklerin sayfası
export default function Likes({ navigation }) {
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = getUserLikes(auth().currentUser.uid).onSnapshot(
      (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setUserLikes(data);
        setLoading(false);
      }
    );

    return subscriber;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <TabTitle title="Beğendiklerin" />
      {Object.keys(userLikes).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey beğenmedin.
        </Text>
      ) : (
        <ImageList data={userLikes} />
      )}
    </View>
  );
}
