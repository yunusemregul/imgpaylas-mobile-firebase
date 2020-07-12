"use strict";

const functions = require("firebase-functions");
const admin = require("./admin");

const createUser = functions.auth.user().onCreate(async (user) => {
  await admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ email: user.email, displayName: user.displayName })
    .then(() => {
      console.log(
        "New user with email '" + user.email + "' saved successfully!"
      );
    });
});

module.exports = createUser;
