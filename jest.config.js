module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/interfaces/**',
    '!**/mocks/**',
    '!**/dto/**'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  verbose: true,
  coverageReporters: ['text', 'lcov', 'json-summary', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
