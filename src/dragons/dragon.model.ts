export const DragonTypes = {
  FIRE: 'FIRE',
  ICE: 'ICE',
  GOLD: 'GOLD',
  SILVER: 'SILVER'
} as const

export interface DragonRepository {
  createDragon(dragonFormData: FormData): Promise<Dragon>
  findDragonById(id: string): Promise<Dragon>
}

export type DragonType = keyof typeof DragonTypes

export type Dragon = {
  id?: string
  name: string
  type: DragonType
  age: number
}

export const dragonTypesToUIOptions = (): string =>
  Object.entries(DragonTypes)
    .map(
      ([key, value]) => `<option value="${value}">${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</option>`
    )
    .join('')
