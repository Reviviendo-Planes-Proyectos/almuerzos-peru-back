import * as nodeCrypto from 'crypto';

if (typeof globalThis.crypto === 'undefined') {
  const cryptoPolyfill: Crypto = {
    getRandomValues: <T extends ArrayBufferView>(arr: T): T => {
      const buffer = nodeCrypto.randomBytes(arr.byteLength);
      new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength).set(buffer);
      return arr;
    },
    randomUUID: () => nodeCrypto.randomUUID(),
    subtle: {} as SubtleCrypto
  };

  globalThis.crypto = cryptoPolyfill;
}

export {};
