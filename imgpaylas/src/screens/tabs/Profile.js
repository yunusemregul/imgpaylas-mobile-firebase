import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import CustomButton from "../components/CustomButton";
import ImageList from "../components/ImageList";
import Loading from "../components/Loading";
import ProfileDetails from "../components/ProfileDetails";
import TabTitle from "../components/TabTitle";
import { getUserImages } from "../Datamanager";
import Uploading from "../modals/Uploading";
import colors from "../styles/colors";

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
  const [isLoading, setLoading] = useState(true);
  const uid = route.params ? route.params.uid : auth().currentUser.uid;
  let activeTask;

  async function upload() {
    ImagePicker.showImagePicker(imagePickerOptions, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled picking an image.");
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
      setLoading(false);
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
        <CustomButton
          buttonStyle={{
            marginTop: 8,
            width: 312,
            backgroundColor: colors.positive,
            alignSelf: "center",
          }}
          onPress={upload}
        >
          YENİ YÜKLE
        </CustomButton>
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
