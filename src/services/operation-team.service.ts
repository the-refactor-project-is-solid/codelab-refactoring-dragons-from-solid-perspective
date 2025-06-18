import { DragonTypes, type Dragon } from '../dragons/dragon.model'
import { NotificationService } from './notification.service'

export class OperationTeamBusinessService {
  static notifyAfterDragonCreation(dragon: Dragon): void {
    if (dragon.type === DragonTypes.GOLD) {
      NotificationService.notify(
        'BusinessMasterBoss',
        `New Gold!! Dragon Created: ${dragon.name}`,
        `Closer to be rich.`
      )
    } else if (dragon.type === DragonTypes.SILVER) {
      NotificationService.notify('Team', `New Silver!! Dragon Created: ${dragon.name}`, `Closer to the best bonus.`)
    }
  }
}
