import auth from "@react-native-firebase/auth";
//import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
//import "@react-native-firebase/functions";

//var functions = firebase.app().functions("europe-west3");

function getUser(uid) {
  return firestore().collection("users").doc(uid);
}

function getDisplayNameFromUID(uid) {
  if (uid == auth().currentUser.uid) {
    return new Promise((resolve, reject) => {
      resolve(auth().currentUser.displayName);
    });
  } else {
    return getUser(uid)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data().displayName;
      });
  }
}

function getUserLikes(uid) {
  return firestore().collection("images").where("likes", "array-contains", uid);
}

function getUserImages(uid) {
  return firestore().collection("images").where("creator", "==", uid);
}

function getImageDetails(id) {
  return firestore().collection("images").doc(id);
}

function getAllImages() {
  return firestore().collection("images").orderBy("timestamp", "desc");
}

function likeImage(id, likes) {
  getImageDetails(id).update({
    likes: [...likes, auth().currentUser.uid],
  });
  // firebase fonksiyonları çok yavaş işliyor çözemedim
  //functions.httpsCallable("likeImage")({ imageId: id });
}

function removeLikeFromImage(id, likes) {
  getImageDetails(id).update({
    likes: likes.filter((val) => {
      return val != auth().currentUser.uid;
    }),
  });
  // firebase fonksiyonları çok yavaş işliyor çözemedim
  /*functions.httpsCallable("removeLikeFromImage")({
    imageId: id,
  });*/
}

export {
  getDisplayNameFromUID,
  getUserImages,
  getAllImages,
  getImageDetails,
  getUserLikes,
  getUser,
  likeImage,
  removeLikeFromImage,
};
