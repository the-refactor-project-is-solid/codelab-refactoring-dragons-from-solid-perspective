import type { Dragon, DragonRepository } from '../dragon.model'

export class RestDragonRepository implements DragonRepository {
  private readonly API_URL = '/api/dragons'

  async createDragon(dragonFormData: FormData): Promise<Dragon> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      body: dragonFormData
    })

    if (!response.ok) {
      throw new Error(`Error creating dragon: ${response.statusText}`)
    }
    const createdDragon: Dragon = await response.json()
    // LoggerService.debug('[CREATE DRAGON] Dragon created:', createdDragon)
    return createdDragon
  }

  async findDragonById(id: string): Promise<Dragon> {
    const response = await fetch(`${this.API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Error retrieving dragon ${id}: ${response.statusText}`)
    }
    return await response.json()
  }
}
