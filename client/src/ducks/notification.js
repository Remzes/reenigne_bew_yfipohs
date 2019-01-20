import { message, notification } from 'antd'
import { ofType } from 'redux-observable'
import { tap, ignoreElements } from 'rxjs/operators'

const appName = "wizard"
export const moduleName = "notification"
export const NOTIFICATION = `${appName}/${moduleName}/NOTIFICATION`

// Actions
export const requestNotification = (type, success, duration, text) => ({ type: NOTIFICATION, payload: { type, success, text }})

// Epics
export const callNotification = action$ => (
  action$.pipe(
    ofType(NOTIFICATION),
    tap(action => {
      const { type, success, duration = 2, text } = action.payload
      let description = text.toString().split('\n')[0]
      switch (type) {
        case "notification":
          success
           ? notification.success({ message: "Success!", description, duration })
           : notification.error({ message: "Error!", description, duration })
          break
        case "message":
          success
            ? message.success(description, duration)
            : message.error(description, duration)
          break
      }
    }),
    ignoreElements()
  )
)
