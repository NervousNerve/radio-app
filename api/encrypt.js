const crypto = require("crypto");

module.exports = function encrypt(password) {
  return crypto.createHmac("sha256", "f453ef8e").update(password).digest("hex");
};
