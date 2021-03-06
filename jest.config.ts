export default {
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "moduleNameMapper": {
    '^@/(.+)': '<rootDir>/src/$1'
  },
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
  "testMatch": [
    "**/test/**/*.test.ts"
  ]
}