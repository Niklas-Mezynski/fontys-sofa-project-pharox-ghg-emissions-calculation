import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  coverageThreshold: {
    global: {
        branches: 80,
        functions: 80,
        lines: 80,
        // statements: -10,
    },
  }
};

export default config;