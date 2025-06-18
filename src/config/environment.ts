export const environment = {
  showLog: true,
  isAnalyticsEnabled: true
} as const

export type Environment = typeof environment
