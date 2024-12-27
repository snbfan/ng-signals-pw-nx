import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  modulePathIgnorePatterns: ['<rootDir>/playwright/'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: ['./src/environments/*', './src/main.ts', './src/polyfills.ts'],
  coverageReporters: ['html'],
  moduleNameMapper: {
    '#core/(.*)': '<rootDir>/src/app/core/$1'
  },
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};

export default config;