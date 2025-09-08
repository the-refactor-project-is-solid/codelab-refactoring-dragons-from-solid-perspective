export const EventTypes = {
  DRAGON_CREATED: 'DRAGON_CREATED',
  OTHER_CREATED: 'OTHER_CREATED'
}

export type EventType = (typeof EventTypes)[keyof typeof EventTypes]

export type Listener<PayloadData> = (data: PayloadData) => void

export class EventManager {
  private static listeners: Map<EventType, Set<Listener<unknown>>> = new Map()

  static subscribe<T = unknown>(eventType: EventType, ...newListeners: Listener<T>[]) {
    const currentListeners = this.listeners.get(eventType) ?? new Set()
    newListeners.forEach(listener => currentListeners.add(listener as Listener<unknown>))
    this.listeners.set(eventType, currentListeners)
  }

  static unsubscribe<T = unknown>(eventType: EventType, ...listenersToDelete: Listener<T>[]) {
    const currentListeners = this.listeners.get(eventType)
    if (currentListeners === undefined) {
      return
    }

    listenersToDelete.forEach(listener => currentListeners.delete(listener as Listener<unknown>))
    if (currentListeners.size === 0) {
      this.listeners.delete(eventType)
    }
  }

  static publish<T>(eventType: EventType, data: T) {
    const currentListeners = this.listeners.get(eventType)
    currentListeners?.forEach(listener => listener(data))
  }
}
