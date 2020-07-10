import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "../../styles/style";
import ImagePicker from "react-native-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

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
  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      console.log(response);
      const reference = storage().ref(
        "user/" + auth().currentUser.uid + "/" + response.fileName
      );
      const pathToFile =
        `${utils.FilePath.PICTURES_DIRECTORY}/images/` + response.fileName;
      await reference.putFile(pathToFile);
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
