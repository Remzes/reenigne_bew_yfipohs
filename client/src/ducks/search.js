import { ofType } from 'redux-observable'
import { exhaustMap, switchMap, pluck } from 'rxjs/operators'
import { of, from } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const appName = "jbfi"
export const moduleName = "search"

export const SEARCH_REQUEST = `${appName}/${moduleName}/SEARCH_REQUEST`
export const SEARCH_FETCHED = `${appName}/${moduleName}/SEARCH_FETCHED`
export const SEARCH_ERROR = `${appName}/${moduleName}/SEARCH_ERROR`

const initial = {
  fetching: false,
  fetched: true,
  error: null,
  success: false,
  message: false
}

export default (state = initial, action) => {
  const { type, payload } = action
  console.log(type)
  switch (type) {
    case SEARCH_REQUEST:
      break;
    case SEARCH_FETCHED:
      break;
    case SEARCH_ERROR:
      break;
  }
}

// ACTIONS
export const requestSearch = text => ({ type: SEARCH_REQUEST, text })

// EPICS
export const fetchSearch = action$ => {

  return action$.pipe(
    ofType(SEARCH_REQUEST),
    exhaustMap(action => {
      ajax.get().pipe(
        pluck('response'),
        switchMap(res => {

        })
      )
    })
  )
}