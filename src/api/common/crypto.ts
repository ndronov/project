import { JSEncrypt } from 'jsencrypt';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function createRandomString(length: number) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return result;
}

const jsEncrypt = new JSEncrypt();

const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY;

jsEncrypt.setPublicKey(publicKey);

export function encryptWithSalt(data: string) {
  return jsEncrypt.encrypt(createRandomString(6) + data);
}
