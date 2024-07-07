'use strict';
import NfcManager, { Ndef, NfcEvents, NfcTech } from 'react-native-nfc-manager';
import { verify } from 'eip55';
import { AES } from 'crypto-js'
import gen32hex from '../gen32hex';
import { NFC_PREFIX_DEFAULT } from '../../constants' ;
import { EthAddressType, BtcAddressType, } from '../../types';

interface convertStringFromQrProps {
  qrString: string;
  aesKey: number;
  currencyNumberStandard?: number;
  purpose?: 'sync' | 'sign';
}


const fastVerification = (address: string): {
    isSuccess: boolean, 
    uri: EthAddressType | BtcAddressType, 
    eip55verified: boolean
} => {
    let verified = verify(address);
    let typedAddress:  EthAddressType = <EthAddressType>address
    return ({isSuccess: true, uri: typedAddress, eip55verified: verified})
}

const convertStringFromQr = async (props: convertStringFromQrProps): Promise<{
    isSuccess: boolean,
    uri?: EthAddressType | BtcAddressType, 
    eip55verified?: boolean ,
    hexAddress?: string, 
    error?: string
}> => {
    if (props.qrString.substring(0, 2) === '0x') {
        //if (currencyNumberStandard === '??') firstly use to new is it eth-similar
        return (fastVerification(props.qrString));
      } else if (props.qrString.substring(0, 7) === 'aes-ccm') {
        let hash = props.qrString.slice(8);
        let decryptedData =  AES.decrypt(hash, props.qrString);
        if (decryptedData.substring(0, 2) === '0x') {
            return (fastVerification(decryptedData));
        } else {
            return ({isSuccess: false, eip55verified: false, error: 'is not a eth-similar address'})
        }
      } else {
        return ({isSuccess: false, eip55verified: false, error: 'is not an encrypted address'})
      }

}

export default convertStringFromQr;