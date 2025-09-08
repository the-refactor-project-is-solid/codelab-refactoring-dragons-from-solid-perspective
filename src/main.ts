import './style.css'
import { createUI as createDragonUI, createListeners as createDragonListeners } from './dragons/dragon.component'
import { mockWindowFetch } from './mocks/fetch'
import { LoggerService } from './services/logger.service'
import { EventManager, EventTypes } from './events/event-manager'
import { AnalyticsService } from './services/analytics.service'
import { OperationTeamBusinessService } from './services/operation-team.service'
import { DragonTypes, type Dragon } from './dragons/dragon.model'
import { NotificationService } from './services/notification.service'

mockWindowFetch()

const dragonUI = createDragonUI()
document.querySelector<HTMLDivElement>('#app')!.appendChild(dragonUI)
createDragonListeners()

const analyticsListener = (createdDragon: Dragon) => AnalyticsService.trackEvent('dragon_created', createdDragon)
const operationTeamListener = (createdDragon: Dragon) =>
  OperationTeamBusinessService.notifyAfterDragonCreation(createdDragon)
const userNotificationListener = (createdDragon: Dragon) =>
  NotificationService.notify('user@email', 'Dragincitos', createdDragon.toString())

const awardDialogListener = (createdDragon: Dragon) => {
  if (createdDragon.type !== DragonTypes.GOLD) {
    return
  }
  const dialogElement = document.createElement('dialog')
  dialogElement.innerHTML = `
    <p>Enhorabuena has conseguido un dragon de oro, 1000 puntazos</p>
    <button id="confirm_award">Confirmar</button>
  `
  document.body.appendChild(dialogElement)
  dialogElement.showModal()
  dialogElement.querySelector('#confirm_award')?.addEventListener('click', () => dialogElement.close())
}

EventManager.subscribe(
  EventTypes.DRAGON_CREATED,
  analyticsListener,
  awardDialogListener,
  operationTeamListener,
  userNotificationListener
)
LoggerService.debug('[MAIN] App initialized successfully')
