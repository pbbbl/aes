# AES-256-GCM encryption/decryption shortcuts

A static class that simplifies encryption/decryption using the AES 256 GCM algorithm.

Just use a one-liner to encrypt or decrypt - the IV and tag are handled
automatically.

## Example

```js
const { encrypt, decrypt, createKey } = require("pbbbl/aes");

// Must be 32 bytes.
const key = "12345678901234567890123456789012";
/* USE included pbbbl/aes createKey() method*/
// const key = createKey(); // - this will generate a 32-byte key

/* OR require crypto */
// const crypto = require('crypto');
// const key = crypto.randomBytes(16).toString('hex')

const dataToEncrypt = {
  a: "foo",
  b: "bar",
  qix: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};
// NOTE: Functions/methods/undefined values will fail at encrypt(key,value).
//  -  All objects and arrays, must pass JSON.stringify

const encrypted = encrypt(key, data);
/** encrypted =>
 *      aksuygdfhjnk
 */

/** If you try to reencrypt the output (even as a child of another object), it may fail authorization **/

const decrypted = decrypt(key, ecnrypted);
/** decrypted =>
 *      {
 *          a: 'foo',
 *          b: 'bar',
 *          qix: [0,1,2,3,4,5,6,7,8,9]
 *      }
 */
```

## Methods

### static encrypt(text, secret)

Encrypts the `text` using the 256-bit shared key (`secret`) and returns an object
containing three base64-encoded strings:

```json
{
  "ciphertext": "(string)",
  "iv": "(string)",
  "tag": "(string)"
}
```

All of those strings must be passed to the end user to successfully decrypt the
text.

### static decrypt(ciphertext, iv, tag, secret)

Decrypts the `ciphertext` using the `iv` and authentication tag `tag` received
from the encryption function, and using the 256-bit shared key (`secret`).

Returns the decoded string.
