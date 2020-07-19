import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import { getUserImages } from "../../Datamanager";
import colors from "../../styles/colors";
import style from "../../styles/style";
import ImageList from "../ImageList";
import Uploading from "../modals/Uploading";
import ProfileDetails from "../ProfileDetails";
import Loading from "../Loading";
import TabTitle from "../TabTitle";

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

// TODO: fotoğraf timestamp ına a göre sort
// TODO: activetask.cancel hata veriyor
// TODO: profil fotoğrafı?
// TODO: isim değiştirebilme özelliği?

export default function Profile({ route, navigation }) {
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [uploadDialogProgress, setUploadDialogProgress] = useState(0);
  const [userPostCount, setUserPostCount] = useState(0);
  const [userLikesCount, setUserLikesCount] = useState(0);
  const [userImages, setUserImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const uid = route.params ? route.params.uid : auth().currentUser.uid;
  let activeTask;

  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      if (response.didCancel) {
        console.log("user cancelled uploading");
        return;
      }
      const reference = storage().ref("user/" + uid + "/" + response.fileName);
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
    const subscriber = getUserImages(uid).onSnapshot((querySnapshot) => {
      let data = [];
      let totalLikes = 0;
      querySnapshot.forEach((documentSnapshot) => {
        data[documentSnapshot.id] = documentSnapshot.data();
        totalLikes += documentSnapshot.data().likes.length;
      });
      setUserLikesCount(totalLikes);
      setUserPostCount(Object.keys(data).length);
      setUserImages(data);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
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
      {uid != auth().currentUser.uid ? (
        <View style={{ marginTop: 28 }} />
      ) : (
        <TabTitle title="Profilin">
          <TouchableOpacity
            onPress={() => {
              navigation.push("Settings");
            }}
            style={{
              alignSelf: "flex-end",
              marginLeft: "auto",
              marginRight: 20,
            }}
          >
            <Image source={require("../../assets/images/icon_settings.png")} />
          </TouchableOpacity>
        </TabTitle>
      )}
      <ProfileDetails
        data={{
          uid: uid,
          likesCount: userLikesCount,
          postCount: userPostCount,
        }}
      />
      {uid == auth().currentUser.uid && (
        <TouchableOpacity
          style={{
            ...style.button,
            marginTop: 8,
            width: 312,
            backgroundColor: colors.positive,
            alignSelf: "center",
          }}
          activeOpacity={1}
          onPress={upload}
        >
          <Text style={{ color: "white", fontSize: 17 }}>YENİ YÜKLE</Text>
        </TouchableOpacity>
      )}
      {Object.keys(userImages).length == 0 ? (
        <Text
          style={{
            color: colors.primary,
            textAlign: "center",
            textAlignVertical: "center",
            height: "80%",
          }}
        >
          Henüz hiç bir şey yüklemedi
          {uid == auth().currentUser.uid && "n"}.
        </Text>
      ) : (
        <ImageList data={userImages} />
      )}
    </View>
  );
}
