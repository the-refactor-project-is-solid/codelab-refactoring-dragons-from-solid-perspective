import { environment } from '../config/environment'

export const LogLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
} as const

export type LogLevel = keyof typeof LogLevels

export class LoggerService {
  private static getLevel(): number {
    return LogLevels[environment.logLevel] ?? LogLevels.ERROR
  }

  private static shouldLog(level: number): boolean {
    return level >= this.getLevel()
  }

  static debug(message: string, ...optionalParams: unknown[]): void {
    if (this.shouldLog(LogLevels.DEBUG)) {
      console.log(`[LOGGER] [DEBUG] ${message}`, ...optionalParams)
    }
  }

  static info(message: string, ...optionalParams: unknown[]): void {
    if (this.shouldLog(LogLevels.INFO)) {
      console.info(`[LOGGER] [INFO] ${message}`, ...optionalParams)
    }
  }

  static warn(message: string, ...optionalParams: unknown[]): void {
    if (this.shouldLog(LogLevels.WARN)) {
      console.warn(`[LOGGER] [WARN] ${message}`, ...optionalParams)
    }
  }

  static error(message: string, ...optionalParams: unknown[]): void {
    if (this.shouldLog(LogLevels.ERROR)) {
      console.error(`[LOGGER] [ERROR] ${message}`, ...optionalParams)
    }
  }

  static fatal(message: string, ...optionalParams: unknown[]): void {
    if (this.shouldLog(LogLevels.FATAL)) {
      console.error(`[LOGGER] [FATAL] ${message}`, ...optionalParams)
    }
  }
}
