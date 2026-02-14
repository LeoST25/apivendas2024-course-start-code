/* eslint-disable @typescript-eslint/no-require-imports */
const { pathsToModuleNameMapper } = require('ts-jest')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const tsconfig = JSON.parse(readFileSync(resolve(__dirname, 'tsconfig.json'), 'utf8'))

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],

  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions?.paths || {},
    { prefix: '<rootDir>/' }
  ),

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  collectCoverageFrom: ['**/*.(t|j)s'],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  preset: 'ts-jest',
}
