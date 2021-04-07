module.exports = {
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^styles/(.*)$': '<rootDir>/src/styles/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  transform: {
    '^.+\\.jsx?$': 'esbuild-jest-transform',
  },
}
