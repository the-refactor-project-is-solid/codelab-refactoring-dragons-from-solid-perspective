import type { Dragon, DragonRepository } from '../dragon.model'

export class MemoryDragonRepository implements DragonRepository {
  readonly #dragonsStore = new Map<string, Dragon>()

  async createDragon(dragonFormData: FormData): Promise<Dragon> {
    const dragon = Object.fromEntries(dragonFormData.entries()) as unknown as Dragon
    dragon.age = Number(dragon.age)
    dragon.id = (this.#dragonsStore.size + 1).toString()
    this.#dragonsStore.set(dragon.id, dragon)
    return Promise.resolve(dragon)
  }

  async findDragonById(id: string): Promise<Dragon> {
    const dragon = this.#dragonsStore.get(id)
    if (!dragon) {
      return Promise.reject('404 dragon not found')
    }

    return Promise.resolve(dragon)
  }

  async deleteAll() {
    this.#dragonsStore.clear()
  }
}
