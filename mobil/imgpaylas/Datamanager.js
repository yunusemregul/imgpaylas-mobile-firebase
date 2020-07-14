import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

function getDisplayNameFromUID(uid) {
  if (uid == auth().currentUser.uid) {
    return new Promise((resolve, reject) => {
      resolve(auth().currentUser.displayName);
    });
  } else {
    return firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data().displayName;
      });
  }
}

function getUserImages(uid) {
  return firestore()
    .collection("images")
    .where("creator", "==", auth().currentUser.uid);
}

function getImageDetails(id) {
  return firestore().collection("images").doc(id);
}

function getAllImages() {
  return firestore().collection("images").orderBy("timestamp", "desc");
}

export { getDisplayNameFromUID, getUserImages, getAllImages, getImageDetails };
