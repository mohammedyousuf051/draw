module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/__tests__/**/*.test.ts'],
    globalSetup: './test-setup/setup.ts',
    globalTeardown: './test-setup/teardown.ts',
    collectCoverage: true,
    coverageDirectory: 'coverage', 
    coverageReporters: ['text', 'lcov'], 
  };