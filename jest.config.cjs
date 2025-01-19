module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.css$": "jest-transform-stub",
    "^.+\\.json$": "jest-transform-stub",
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // This maps .css files to identity-obj-proxy
  },
  testEnvironment: "jsdom",
};
