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

/*
  In current version, users go to the database themselves and edit some images likes themselves. This is such a bad way
  and creates a big security hole as users are allowed to edit any image in the database as they wish. I thought of a way, found
  'Firebase Cloud Functions', tried it. It was too slow to process my requests. For example a simple like function took over a minute
  for the server to add the like to the database. So for now, user edits the database himself to add/remove his like on a image.
  
  I think the only way to solve this is to abandon Firebase and switch to my own API which I already made with imgpaylas-web.
*/
function likeImage(id, likes) {
  getImageDetails(id).update({
    likes: [...likes, auth().currentUser.uid],
  });
}

function removeLikeFromImage(id, likes) {
  getImageDetails(id).update({
    likes: likes.filter((val) => {
      return val != auth().currentUser.uid;
    }),
  });
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
