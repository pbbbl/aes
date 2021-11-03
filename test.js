// MY SUPER JANKY TEST
const { encrypt, decrypt, createKey } = require("./index.js");
const test = {
  secret: { mysecret: "secret", array: ["asdf", "67iykug"] },
  key: createKey(),
};
const encrypted1 = encrypt(test.key, test.secret);

const decrypted1 = decrypt(test.key, encrypted1);

const encrypted2 = encrypt(test.key, decrypted1);

const decrypted2 = decrypt(test.key, encrypted2);

console.log({
  encrypted1,
  decrypted1,
  encrypted2,
  decrypted2,
});
