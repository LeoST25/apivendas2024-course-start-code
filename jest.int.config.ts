import { pathsToModuleNameMapper } from 'ts-jest'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { compilerOptions } = require('./tsconfig.json')

export default {
  moduleFileExtensions: ['ts', 'js', 'json'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),

  testRegex: '.*\\.int-spec\\.ts$',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],

  coverageDirectory: '../coverage',

  testEnvironment: 'node',
}
