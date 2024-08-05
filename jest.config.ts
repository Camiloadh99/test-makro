/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@fnd/(.*)$': '<rootDir>/src/infrastructure/$1'
  },
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-node'
};

export default config;
