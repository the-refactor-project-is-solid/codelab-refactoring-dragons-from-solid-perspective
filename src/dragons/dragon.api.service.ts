import { LoggerService } from '../services/logger.service'
import type { Dragon } from './dragon.model'

export class DragonApiService {
  private static readonly API_URL = '/api/dragons'

  static async createDragon(dragonFormData: FormData): Promise<Dragon> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        body: dragonFormData
      })

      if (!response.ok) {
        throw new Error(`Error creating dragon: ${response.statusText}`)
      }
      const createdDragon: Dragon = await response.json()
      LoggerService.debug('[CREATE DRAGON] Dragon created:', createdDragon)
      return createdDragon
    } catch (error) {
      LoggerService.fatal('[CREATE DRAGON] Error connecting to the server:', error)
      throw error
    }
  }
}
