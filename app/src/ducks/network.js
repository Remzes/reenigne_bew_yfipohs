import { map } from 'rxjs/operators'
import { of, Observable, fromEvent, merge } from 'rxjs'
import { NOTIFICATION, requestNotification } from './notification'

const appName = "wizard"

export const moduleName = "network"
export const NETWORK_OFFLINE = `${appName}/${moduleName}/NETWORK_OFFLINE`
export const NETWORK_ONLINE = `${appName}/${moduleName}/NETWORK_OFFLINE`

// EPIC

export const networkOffline = () =>
    fromEvent(window, 'offline').pipe(
      map(e => ({ type: NETWORK_OFFLINE })),
      map(e => requestNotification("message", false, 20, "You are offline!"))
    )

export const networkOnline = () =>
    fromEvent(window, 'online').pipe(
      map(e => ({ type: NETWORK_ONLINE })),
      map(e => requestNotification("message", true, 20, "You are back!"))
    )