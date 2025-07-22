import './crypto-polyfill';

describe('crypto-polyfill', () => {
  it('debería definir globalThis.crypto', () => {
    expect(globalThis.crypto).toBeDefined();
    expect(typeof globalThis.crypto.getRandomValues).toBe('function');
    expect(typeof globalThis.crypto.randomUUID).toBe('function');
    expect(globalThis.crypto.subtle).toBeDefined();
  });

  it('getRandomValues debería llenar el buffer', () => {
    const arr = new Uint8Array(10);
    const result = globalThis.crypto.getRandomValues(arr);
    expect(result).toBe(arr);
    expect(arr.some((v) => v !== 0)).toBe(true);
  });

  it('randomUUID debería retornar un string UUID válido', () => {
    const uuid = globalThis.crypto.randomUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/[0-9a-fA-F-]{36}/);
  });
});
