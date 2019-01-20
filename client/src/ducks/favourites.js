import { ofType } from 'redux-observable'
import { exhaustMap, switchMap, pluck, takeUntil } from 'rxjs/operators'
import { of, from, Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'

const appName = "wizard"
export const moduleName = "search"

export const FAVOURITES_ADD_REQUEST = `${appName}/${moduleName}/FAVOURITES_ADD_REQUEST`
export const FAVOURITES_ADD_FETCHED = `${appName}/${moduleName}/FAVOURITES_ADD_FETCHED`
export const FAVOURITES_ADD_ERROR = `${appName}/${moduleName}/FAVOURITES_ADD_ERROR`
export const FAVOURITES_REMOVE_REQUEST = `${appName}/${moduleName}/FAVOURITES_REMOVE_REQUEST`
export const FAVOURITES_REMOVE_FETCHED = `${appName}/${moduleName}/FAVOURITES_REMOVE_FETCHED`
export const FAVOURITES_REMOVE_ERROR = `${appName}/${moduleName}/FAVOURITES_REMOVE_ERROR`

const initial = {
  fetching: false,
  fetched: true,
  error: null,
  success: false,
  message: false,
  data: []
}

export default (state = initial, action) => {
  const { type, payload } = action
  let data = []
  switch (type) {
    case FAVOURITES_ADD_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: [], message: '' }
    case FAVOURITES_ADD_FETCHED:
      data = [...state.data]
      data.push(payload.item)
      return { ...state, fetching: false, fetched: true, error: null, success: true, data, message: '' }
    case FAVOURITES_ADD_ERROR:
      return { ...state, fetching: false, fetched: true, error: true, success: false, data: [], message: payload.err }
    case FAVOURITES_REMOVE_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: [], message: '' }
    case FAVOURITES_REMOVE_FETCHED:
      data = [...state.data]
      const index = data.findIndex(e => e.id === payload.id)
      data.splice(index, 1)
      return { ...state, fetching: false, fetched: true, error: null, success: true, data, message: '' }
    case FAVOURITES_REMOVE_ERROR:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: [], message: '' }
    default:
      return state
  }
}

// ACTIONS
export const requestAddFavourite = (item = {}) => ({ type: FAVOURITES_ADD_REQUEST, item })
export const requestRemoveFavourite = (id = '') => ({ type: FAVOURITES_ADD_REQUEST, id })

// EPICS
export const fetchAddFavourite = action$ => {
  return action$.pipe(
    ofType(FAVOURITES_ADD_REQUEST),
    exhaustMap(action => (
      ajax.post(`/api/favourites`, { item: action.item }).pipe(
        pluck('response'),
        switchMap(res => {

        })
      )
    ))
  )
}