import type { LogLevel } from '../services/logger.service'

export const environment = {
  logLevel: 'DEBUG' as LogLevel,
  isAnalyticsEnabled: true
} as const

export type Environment = typeof environment
