import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import storage from "@react-native-firebase/storage";
import style from "../../styles/style";
import ImagePicker from "react-native-image-picker";

const imagePickerOptions = {
  title: "YÜKLENECEK FOTOĞRAF",
  cancelButtonTitle: "İptal",
  takePhotoButtonTitle: "Fotoğraf çek...",
  chooseFromLibraryButtonTitle: "Fotoğraflarından seç...",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

export default function Uploads() {
  function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      console.log(response);
    });
  }

  return (
    <View>
      <Text style={style.tabtitle}>Yüklediklerin</Text>
      <TouchableOpacity
        style={style.uploadnewbutton}
        activeOpacity={1}
        onPress={upload}
      >
        <Text style={{ color: "white", fontSize: 17 }}>YENİ YÜKLE</Text>
      </TouchableOpacity>
    </View>
  );
}
