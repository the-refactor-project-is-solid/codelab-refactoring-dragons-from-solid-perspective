import { EventManager, EventTypes } from '../events/event-manager'
import { inject } from '../services/dependency-injector/injector.service'
import { LoggerService } from '../services/logger.service'
import { type DragonRepository, dragonTypesToUIOptions, type Dragon } from './dragon.model'

const INITIAL_AGE = 20

export const createUI = (dragon?: Dragon): HTMLElement => {
  const dragonContainer = document.createElement('div')
  dragonContainer.id = 'dragon-container'

  const form = createDragonForm()
  dragonContainer.appendChild(form)

  if (dragon) {
    const detail = createDragonDetail(dragon)
    dragonContainer.appendChild(detail)
  }

  return dragonContainer
}

export const createListeners = () => {
  const form = document.querySelector<HTMLFormElement>('#dragon-form')
  if (!form) return

  form.addEventListener('submit', async event => {
    event.preventDefault()
    createDragonToAPI(new FormData(form))
    form.reset()
  })

  form.querySelector<HTMLFormElement>('#age')?.addEventListener('input', function (event: Event) {
    const ageInputElement = event.target as HTMLInputElement | null
    const ageValueElement = form.querySelector<HTMLElement>('#age-value')
    if (ageInputElement && ageValueElement) {
      ageValueElement.textContent = ageInputElement.value
    }
  })
}

// PRIVATE API
const createDragonForm = (): HTMLElement => {
  const form = document.createElement('form')
  form.id = 'dragon-form'
  form.className = 'container__column padding--small'
  form.innerHTML = `
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
    </div>
    
    <div>
      <label for="type">Type:</label>
      <select id="type" name="type" required>
        ${dragonTypesToUIOptions()}
      </select>
    </div>
    
    <div>
      <label for="age">Age:</label>
      <input type="range" id="age" name="age" required min="1" max="1000" value="${INITIAL_AGE}">
      <span id="age-value">${INITIAL_AGE}</span>
    </div>
  
    <button type="submit">Create Dragon</button>
  `
  return form
}

const createDragonDetail = (dragon: Dragon): HTMLElement => {
  const detail = document.createElement('div')
  detail.className = 'dragon-detail'
  detail.innerHTML = `
    <h2>${dragon.name}</h2>
    <p>Type: ${dragon.type}</p>
    <p>Age: ${dragon.age}</p>
  `
  return detail
}

const createDragonToAPI = async (dragonFormData: FormData): Promise<void> => {
  try {
    const createdDragon: Dragon = await inject<DragonRepository>('dragonRepository').createDragon(dragonFormData)
    EventManager.publish(EventTypes.DRAGON_CREATED, createdDragon)
    LoggerService.debug('[CREATE DRAGON] All business tasks executed successfully')
  } catch (error) {
    LoggerService.error('[CREATE DRAGON] Error creating the dragon:', error)
  }
}
