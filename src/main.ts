import './style.css'
import { createUI as createDragonUI, createListeners as createDragonListeners } from './dragons/dragon.component'
import { mockWindowFetch } from './mocks/fetch'

mockWindowFetch()

const dragonUI = createDragonUI()
document.querySelector<HTMLDivElement>('#app')!.appendChild(dragonUI)
createDragonListeners()
