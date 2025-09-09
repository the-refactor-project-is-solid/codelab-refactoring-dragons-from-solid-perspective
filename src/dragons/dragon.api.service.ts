import { LoggerService } from '../services/logger.service'
import type { Dragon } from './dragon.model'

export class DragonApiService {
  private static readonly dragonsStore = new Map<string, Dragon>()

  static async createDragon(dragonFormData: FormData): Promise<Dragon> {
    const dragon = Object.fromEntries(dragonFormData.entries()) as unknown as Dragon
    dragon.age = Number(dragon.age)
    dragon.id = (this.dragonsStore.size + 1).toString()
    this.dragonsStore.set(dragon.id, dragon)
    return Promise.resolve(dragon)
  }

  static async findDragonById(id: string): Promise<Dragon> {
    const dragon = this.dragonsStore.get(id)
    if (!dragon) {
      LoggerService.debug(
        `[DRAGON API SERVICE] [FIND BY ID] dragon ${id} not found. current store size: ${this.dragonsStore.size}`
      )
      return Promise.reject('404 dragon not found')
    }

    return Promise.resolve(dragon)
  }

  static async deleteAll(): Promise<void> {
    this.dragonsStore.clear()
    return Promise.resolve()
  }
}
