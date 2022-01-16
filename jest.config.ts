/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: true,
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testMatch: [
    // "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};
