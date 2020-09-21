import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  getDisplayNameFromUID,
  getImageDetails,
  likeImage,
  removeLikeFromImage,
} from "../Datamanager";
import colors from "../styles/colors";

// TODO: Date yi okunabilir hale formatlamak şuan sadece toString yapıyorum
// TODO: Fotoğraf sahibine fotoğrafı silebilme yetkisi

// Bir fotoğrafa tıklandığında büyük halini ve açıklamasını (gönderen, beğeniler) gösteren komponent
export default function ImageDetails({ route, navigation }) {
  const [data, setData] = useState(route.params.data); // Muhtemelen kötü bir yöntem
  const [creatorName, setCreatorName] = useState("...");
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = getImageDetails(route.params.id).onSnapshot(
      (querySnapshot) => {
        setData(querySnapshot.data());
      }
    );

    getDisplayNameFromUID(route.params.data.creator).then((name) => {
      setCreatorName(name);
      setInitializing(false);
    });

    return subscriber;
  }, []);
  if (initializing) return null;

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 480,
          backgroundColor: "black",
        }}
      >
        <Image
          source={{ uri: data.url }}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            resizeMode: "contain",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.push("ProfileDetails", {
            uid: route.params.data.creator,
          });
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 27,
            fontWeight: "bold",
            marginLeft: 12,
            marginTop: 8,
          }}
        >
          {creatorName}
        </Text>
      </TouchableOpacity>
      <Text style={{ color: colors.primary, fontSize: 19, marginLeft: 12 }}>
        {new Date(data.timestamp).toString()}
      </Text>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 480 + 6,
          right: 8,
          flexDirection: "row",
        }}
        onPress={() => {
          if (!data.likes.includes(auth().currentUser.uid)) {
            likeImage(route.params.id, data.likes);
          } else {
            removeLikeFromImage(route.params.id, data.likes);
          }
        }}
      >
        <Text
          style={{
            color: data.likes.includes(auth().currentUser.uid)
              ? colors.important
              : colors.primary,
            marginLeft: 2,
            marginRight: 2,
            fontSize: 27,
            fontWeight: "bold",
          }}
        >
          {data.likes.length}
        </Text>
        <Image
          source={
            data.likes.includes(auth().currentUser.uid)
              ? require("../../assets/images/icon_likes_focused.png")
              : require("../../assets/images/icon_likes.png")
          }
          style={{
            marginRight: 2,
            top: 1,
            width: 27,
            height: 27,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
