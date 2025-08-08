module.exports = {
  rootDir: 'src',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/interfaces/**',
    '!**/dto/**',
    '!**/__mocks__/**',
    '!**/config/**',
    '!**/constants/**',
    '!infrastructure/database/**/*.entity.ts'
  ],
  coverageReporters: ['text', 'lcov', 'json-summary', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
