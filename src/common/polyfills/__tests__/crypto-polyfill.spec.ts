import '../crypto-polyfill';

describe('crypto-polyfill', () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    jest.resetModules();
    delete globalThis.crypto;
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
  });

  it('debería definir globalThis.crypto cuando no existe', async () => {
    expect(globalThis.crypto).toBeUndefined();

    await import('../crypto-polyfill');

    expect(globalThis.crypto).toBeDefined();
    expect(typeof globalThis.crypto.getRandomValues).toBe('function');
    expect(typeof globalThis.crypto.randomUUID).toBe('function');
  });

  it('getRandomValues debería llenar el buffer', async () => {
    await import('../crypto-polyfill');
    const arr = new Uint8Array(10);
    const result = globalThis.crypto.getRandomValues(arr);
    expect(result).toBe(arr);
    expect(arr.some((v) => v !== 0)).toBe(true);
  });

  it('randomUUID debería retornar un string UUID válido', async () => {
    await import('../crypto-polyfill');
    const uuid = globalThis.crypto.randomUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/[0-9a-fA-F-]{36}/);
  });
});
