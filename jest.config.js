/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  root: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+||.ts$':'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)':'<rootDir>/src/$1'
  }
};