'use strict';

const functions = require('firebase-functions');
const admin = require('./admin');

const createUser = functions.auth.user().onCreate(async (user) => {
  await admin.database().ref("users").push({email: user.email, displayName: user.displayName, uid: user.uid});
  return console.log("New user with email '"+user.email+"' saved successfully! ");
});

module.exports = createUser;
