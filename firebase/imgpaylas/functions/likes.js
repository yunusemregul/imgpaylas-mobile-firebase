const functions = require("firebase-functions");
const admin = require("./admin");

exports.likeImage = functions
  .region("europe-west3")
  .https.onCall((data, context) => {
    if (!context.auth) return;

    const { imageId } = data;

    if (!imageId) return;

    console.log(`User '${context.auth.uid}' tries to like image '${imageId}'`);

    const image = admin.firestore().collection("images").doc(imageId);

    image.get().then((documentSnapshot) => {
      console.log(`Got information for image ${imageId}`);
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();

        if (data.likes.includes(context.auth.uid)) return;

        image
          .update({ likes: [...data.likes, context.auth.uid] })
          .then(() =>
            console.log(
              `User '${context.auth.uid}' succesfully liked image '${imageId}'`
            )
          );
      }
    });
  });

// bu fonksiyona daha iyi bir isim bulunabilir
exports.removeLikeFromImage = functions
  .region("europe-west3")
  .https.onCall((data, context) => {
    if (!context.auth) return;

    const { imageId } = data;

    if (!imageId) return;

    console.log(
      `User '${context.auth.uid}' tries to remove like from image '${imageId}'`
    );

    const image = admin.firestore().collection("images").doc(imageId);

    image.get().then((documentSnapshot) => {
      console.log(`Got information for image ${imageId}`);
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();

        if (!data.likes.includes(context.auth.uid)) return;

        // filtreleme dışında daha iyi yöntem bulunabilir belki direk içinden silmek gibi
        image
          .update({
            likes: data.likes.filter((val) => {
              return val != context.auth.uid;
            }),
          })
          .then(() =>
            console.log(
              `User '${context.auth.uid}' succesfully removed like from image '${imageId}'`
            )
          );
      }
    });
  });
