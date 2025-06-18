import { environment } from '../config/environment'
import { LoggerService } from './logger.service'

export class AnalyticsService {
  private static readonly ANALYTICS_URL = '/api/analytics'

  static async trackEvent(eventName: string, eventData: Record<string, unknown>): Promise<void> {
    if (!environment.isAnalyticsEnabled) {
      LoggerService.debug('[ANALYTICS] Analytics tracking is disabled in the environment configuration.')
      return
    }
    try {
      const response = await fetch(`${this.ANALYTICS_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventName,
          eventData,
          timestamp: new Date().toISOString()
        })
      })
      if (!response.ok) {
        return LoggerService.warn(`Error tracking event: ${response.statusText}`)
      }
      LoggerService.debug('[ANALYTICS] Event tracked successfully')
    } catch (error) {
      LoggerService.warn('[ANALYTICS] Error tracking event:', error)
    }
  }
}
