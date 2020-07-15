import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import colors from "../../styles/colors";
import style from "../../styles/style";
import ImageList from "../ImageList";
import { getUserLikes } from "../../Datamanager";

export default function Likes({ navigation }) {
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const subscriber = getUserLikes(auth().currentUser.uid).onSnapshot(
      (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((documentSnapshot) => {
          data[documentSnapshot.id] = documentSnapshot.data();
        });
        setUserLikes(data);
      }
    );

    return subscriber;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={style.tabtitle}>Beğendiklerin</Text>
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
