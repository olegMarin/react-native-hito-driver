'use strict';
import NfcManager, { Ndef, NfcEvents, NfcTech } from 'react-native-nfc-manager';
import gen32hex from '../gen32hex';
import { NFC_PREFIX_DEFAULT } from '../../constants';

interface NfcBroadcastProps {
  currency?: number;
  currencyNumberStandart?: number;
  account?: number;
  purpose?: 'sync' | 'sign';
}

const NfcBroadcast = async (props: NfcBroadcastProps): Promise<{
  isSuccess: boolean,
  aesKey: string,
  error?: string
}> => {
  let result = false;
  let aesKey = gen32hex();
  let comandString = NFC_PREFIX_DEFAULT + aesKey;
  if (props.account && props.currency && props.currencyNumberStandart) {
    comandString = `hito.pair:${props.currencyNumberStandart}h:${props.currency}h:${props.account}h:` + aesKey;
  }
  try {
    const deviceIsSupported = await NfcManager.isSupported();
    if (deviceIsSupported) {
      await NfcManager.start();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(comandString)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
      NfcManager.cancelTechnologyRequest();
      return ({ isSuccess: result, aesKey: aesKey });
    } else {
      console.warn('nfc is not supported');
      return ({ isSuccess: result, aesKey: aesKey, error: 'nfc is not supported' });
    }

  } catch (err) {
    console.warn(err);
    return ({ isSuccess: result, aesKey: aesKey, error: err });
  }
}
export default NfcBroadcast