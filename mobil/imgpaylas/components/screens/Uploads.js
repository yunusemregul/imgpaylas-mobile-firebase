import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import storage from "@react-native-firebase/storage";
import style from "../../styles/style";

export default function Uploads() {
  return (
    <View>
      <Text style={style.tabtitle}>Yüklediklerin</Text>
      <TouchableOpacity style={style.uploadnewbutton} activeOpacity={1}>
        <Text style={{ color: "white", fontSize: 17 }}>YENİ YÜKLE</Text>
      </TouchableOpacity>
    </View>
  );
}
