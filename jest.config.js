import { createDefaultEsmPreset } from 'ts-jest'

const tsJestTransformCfg = createDefaultEsmPreset()

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'jsdom',
  ...tsJestTransformCfg
}
