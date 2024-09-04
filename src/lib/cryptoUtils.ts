import CryptoJS from 'crypto-js';

const SECRET_KEY = '92848778-5769-4e68-9195-acdddc9c74bb';

export const decryptParam = (value: string, secretKey: string = SECRET_KEY): string => {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(value), secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptParam = (value: string, secretKey: string = SECRET_KEY) => {
    return encodeURIComponent(CryptoJS.AES.encrypt(value, secretKey).toString());
}

