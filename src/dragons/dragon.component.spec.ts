import { DragonApiService } from './dragon.api.service'
import { createListeners, createUI } from './dragon.component'
import { DragonTypes, type Dragon } from './dragon.model'

const renderTestDragon = (dragon?: Dragon) => {
  const element = createUI(dragon)
  document.body.appendChild(element)
}
const dragonMock: Dragon = { id: '1', name: 'Smaug', type: DragonTypes.FIRE, age: 120 }

describe('Given a Dragon Component,', () => {
  it('should render empty dragon form when no init dragon', () => {
    renderTestDragon()

    const dragonName: HTMLInputElement | null = document.querySelector('#name')
    expect(dragonName?.value).toBe('')
  })

  it('should render the given initial dragon', () => {
    renderTestDragon(dragonMock)

    const dragonName: HTMLElement | null = document.querySelector('.dragon-detail > h2')
    expect(document.querySelectorAll('.dragon-detail')).toHaveLength(1)
    expect(dragonName?.textContent).toBe(dragonMock.name)
  })

  describe('When applying listeners', () => {
    beforeEach(() => {
      renderTestDragon()
      createListeners()
    })

    afterEach(async () => {
      await DragonApiService.deleteAll()
    })

    xit('should create a dragon', async () => {
      const form = document.querySelector<HTMLFormElement>('#dragon-form')!
      const nameInput = form.querySelector<HTMLInputElement>("input[name='name']")!
      const typeInput = form.querySelector<HTMLInputElement>("select[name='type']")!
      const ageInput = form.querySelector<HTMLInputElement>("input[name='age']")!

      nameInput.value = dragonMock.name
      typeInput.value = dragonMock.type
      ageInput.value = dragonMock.age.toString()

      form.dispatchEvent(new Event('submit', { bubbles: true }))

      const createdDragon = await DragonApiService.findDragonById('1')
      expect(createdDragon).toEqual(dragonMock)
    })
  })
})
