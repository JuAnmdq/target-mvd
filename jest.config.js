module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/tools/svgrMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/tools/fileMock.js'
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/tools/testSetup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  modulePathIgnorePatterns: ['<rootDir>/cypress'],
  coverageDirectory: 'coverage_jest'
};
