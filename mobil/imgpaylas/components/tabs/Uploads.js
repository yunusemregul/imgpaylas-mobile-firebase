import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import style from "../../styles/style";
import colors from "../../styles/colors";
import ImagePicker from "react-native-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import Uploading from "../modals/Uploading";
import ImageBox from "../ImageBox";
import database from "@react-native-firebase/database";

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
  const [userImages, setUserImages] = useState({});
  let activeTask;

  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      if (response.didCancel) {
        console.log("user cancelled uploading");
        return;
      }
      const reference = storage().ref(
        "user/" + auth().currentUser.uid + "/" + response.fileName
      );
      const pathToFile = response.path;
      activeTask = reference.putFile(pathToFile);
      setUploadDialogVisible(true);
      activeTask.on("state_changed", (taskSnapshot) => {
        setUploadDialogProgress(
          Math.floor(
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
          )
        );
      });
    });
  }

  useEffect(() => {
    database()
      .ref("/images")
      .on("value", (snapshot) => {
        let data = snapshot.val() ? snapshot.val() : {};
        setUserImages(data);
      });
  }, [uploadDialogProgress]);

  return (
    <View>
      <Uploading
        visible={uploadDialogVisible}
        progress={uploadDialogProgress}
        onClose={() => {
          setUploadDialogVisible(false);
        }}
        onCancel={() => {
          activeTask.cancel();
          setUploadDialogVisible(false);
        }}
      />
      <Text style={style.tabtitle}>Yüklediklerin</Text>
      <TouchableOpacity
        style={style.uploadnewbutton}
        activeOpacity={1}
        onPress={upload}
      >
        <Text style={{ color: "white", fontSize: 17 }}>YENİ YÜKLE</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(userImages)}
        renderItem={({ item }) => {
          return <ImageBox key={item} image={userImages[item].thumbnail} />;
        }}
        numColumns={3}
        keyExtractor={(item) => item}
        style={{ padding: "4%" }}
      />
    </View>
  );
}
