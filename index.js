const crypto = require("crypto");
const Aes = require("aes-256-gcm");
const { base64encode, base64decode } = require("nodejs-base64");

function encrypt(key, decrypted) {
  const result = Aes.encrypt(objToString({ DECRYPTED: decrypted }), key);
  const { ciphertext, iv, tag } = result;
  const c = ciphertext;
  const i = iv;
  const t = tag;
  return objToString({ c, i, t });
}
function decrypt(key, encrypted) {
  const encryptedObj = stringToObj(encrypted);
  const { c, i, t } = encryptedObj;
  const result = Aes.decrypt(c, i, t, key);
  const { DECRYPTED } = stringToObj(result);
  return DECRYPTED;
}
function createKey() {
  return crypto.randomBytes(16).toString("hex");
}
function stringToObj(str) {
  const json = base64decode(str);
  return JSON.parse(json);
}
function objToString(obj) {
  const json = JSON.stringify(obj);
  return base64encode(json);
}

module.exports = {
  encrypt,
  decrypt,
  createKey,
  stringToObj,
  objToString,
};
