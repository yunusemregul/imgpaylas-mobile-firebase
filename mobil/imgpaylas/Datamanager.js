import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

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

export {
  getDisplayNameFromUID,
  getUserImages,
  getAllImages,
  getImageDetails,
  getUserLikes,
  getUser,
};

