import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import style from "../../styles/style";
import colors from "../../styles/colors";
import ImagePicker from "react-native-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import Uploading from "../modals/Uploading";

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
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [uploadDialogProgress, setUploadDialogProgress] = useState(0);

  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      console.log(response);
      const reference = storage().ref(
        "user/" + auth().currentUser.uid + "/" + response.fileName
      );
      const pathToFile = response.path;
      const task = reference.putFile(pathToFile);
      setUploadDialogVisible(true);
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        );
        setUploadDialogProgress(
          Math.floor(
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
          )
        );
      });
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
        <Uploading
          visible={uploadDialogVisible}
          progress={uploadDialogProgress}
        />
      </TouchableOpacity>
    </View>
  );
}
