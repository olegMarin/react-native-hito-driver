import crypto from 'react-native-quick-crypto';
const gen32hex = () => {
    let buffer: ArrayBuffer = crypto.randomBytes(32);
    let hextoken: string = (buffer as Buffer).toString('hex');
    return hextoken;
  }
  
export default gen32hex;