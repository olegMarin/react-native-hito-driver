type hex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
type hex256 =  `${hex}${hex}`;

//type hex256x2 = `${hex256}${hex256}`;
//type hex256x4 = `${hex256x2}${hex256x2}`;

//type hex256x20 = `${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}${hex256x2}`;
//type hex256x22 = `${hex256x20}${hex256x2}`;

type EthAddressType = `0x${string}`;
type IsValid0x<T extends string> = T extends EthAddressType ? true : false;

type BtcAddressType = `1${string}` | `3${string}` | `bc1${string}`;
type IsValidBtc<T extends string> = T extends BtcAddressType ? true : false;

export {EthAddressType, IsValid0x, BtcAddressType, IsValidBtc, hex, hex256};