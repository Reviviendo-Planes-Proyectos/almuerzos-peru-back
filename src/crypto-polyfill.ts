// Polyfill para crypto en Node.js
import * as nodeCrypto from 'crypto';

// Si no existe crypto global, lo definimos
if (typeof globalThis.crypto === 'undefined') {
  // Polyfill básico para Web Crypto API en Node.js
  globalThis.crypto = {
    getRandomValues: (arr: any) => {
      const buffer = nodeCrypto.randomBytes(arr.length);
      arr.set(buffer);
      return arr;
    },
    randomUUID: () => nodeCrypto.randomUUID(),
    subtle: {} as any, // Stub para crypto.subtle
  } as any;
}

export {};
