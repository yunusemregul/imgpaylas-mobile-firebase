const functions = require("firebase-functions");
const admin = require("./admin");

exports.likeImage = functions.https.onCall((data, context) => {
  if (!context.auth) return;

  const { imageId } = data;

  if (!imageId) return;

  const image = admin.firestore().collection("images").doc(imageId);

  image.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();

      if (data.likes.includes(context.auth.uid)) return;

      image.update({ likes: [...data.likes, context.auth.uid] });
    }
  });
});

// bu fonksiyona daha iyi bir isim bulunabilir
exports.removeLikeFromImage = functions.https.onCall((data, context) => {
  if (!context.auth) return;

  const { imageId } = data;

  if (!imageId) return;

  const image = admin.firestore().collection("images").doc(imageId);

  image.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();

      if (!data.likes.includes(context.auth.uid)) return;

      // filtreleme dışında daha iyi yöntem bulunabilir belki direk içinden silmek gibi
      image.update({
        likes: data.likes.filter((val) => {
          return val != context.auth.uid;
        }),
      });
    }
  });
});
