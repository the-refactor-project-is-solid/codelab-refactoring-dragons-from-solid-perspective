import { LoggerService } from './logger.service'

export class NotificationService {
  static notifyBusinessMasterBoss(subject: string, message: string): void {
    this.notify('BusinessMasterBoss', subject, message)
    LoggerService.debug('[NOTIFICATION] Notification sent to Super Boss:', subject, message)
  }

  static notifyTeam(subject: string, message: string): void {
    this.notify('Team', subject, message)
  }

  private static async notify(destination: string, subject: string, message: string): Promise<void> {
    try {
      const response = await fetch(`/api/sendEmailTo${destination}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject,
          message
        })
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      LoggerService.debug(`[NOTIFICATION] Notification sent to ${destination}:`, subject, message)
    } catch (error) {
      LoggerService.warn(`[NOTIFICATION] Error sending notification to ${destination}:`, error)
    }
  }
}
