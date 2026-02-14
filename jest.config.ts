import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// recria __dirname no ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// lê tsconfig
const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, 'tsconfig.json'), 'utf8'),
)

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'js', 'json'],

  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions?.paths ?? {},
    { prefix: '<rootDir>/' },
  ),

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  collectCoverageFrom: ['**/*.(t|j)s'],

  coverageDirectory: 'coverage',
}

export default config
