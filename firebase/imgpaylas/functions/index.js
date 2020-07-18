const saveUsers = require("./save-users");
const generateThumbnail = require("./generate-thumbnail");
const { likeImage, removeLikeFromImage, helloWorld } = require("./likes");

exports.saveUsers = saveUsers;
exports.generateThumbnail = generateThumbnail;
exports.likeImage = likeImage;
exports.removeLikeFromImage = removeLikeFromImage;
