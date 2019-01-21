import _ from 'lodash'
import { ofType } from 'redux-observable'
import { exhaustMap, switchMap, pluck, takeUntil, catchError } from 'rxjs/operators'
import { of, from, Observable, merge } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { requestNotification } from './notification'

const appName = "wizard"
export const moduleName = "search"

export const FAVOURITES_REQUEST = `${appName}/${moduleName}/FAVOURITES_REQUEST`
export const FAVOURITES_FETCHED = `${appName}/${moduleName}/FAVOURITES_FETCHED`
export const FAVOURITES_ERROR = `${appName}/${moduleName}/FAVOURITES_ERROR`
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

    case FAVOURITES_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: [], message: '' }
    case FAVOURITES_FETCHED:
      return { ...state, fetching: false, fetched: true, error: null, success: true, data: payload.data, message: payload.message }
    case FAVOURITES_ERROR:
      return { ...state, fetching: false, fetched: true, error: true, success: false, data: [], message: payload.err }

    case FAVOURITES_ADD_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: state.data, message: '' }
    case FAVOURITES_ADD_FETCHED:
      data = _.cloneDeep(state.data)
      const item = {...payload.item, isFav: true}
      data.push(item)
      return { ...state, fetching: false, fetched: true, error: null, success: true, data, message: payload.message }
    case FAVOURITES_ADD_ERROR:
      return { ...state, fetching: false, fetched: true, error: true, success: false, data: state.data, message: payload.err }

    case FAVOURITES_REMOVE_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: state.data, message: '' }
    case FAVOURITES_REMOVE_FETCHED:
      data = _.cloneDeep(state.data)
      const index = data.findIndex(e => e.title === payload.id)
      data.splice(index, 1)
      return { ...state, fetching: false, fetched: true, error: null, success: true, data, message: '' }
    case FAVOURITES_REMOVE_ERROR:
      return { ...state, fetching: false, fetched: true, error: null, success: false, data: state.data, message: '' }
    default:
      return state
  }
}

// ACTIONS
export const requestFavourites = () => ({ type: FAVOURITES_REQUEST })
export const requestAddFavourite = (item = {}) => ({ type: FAVOURITES_ADD_REQUEST, item })
export const requestRemoveFavourite = (id = '') => ({ type: FAVOURITES_REMOVE_REQUEST, id })

// EPICS
export const fetchFavourites = action$ => {
  return action$.pipe(
    ofType(FAVOURITES_REQUEST),
    exhaustMap(action => (
      ajax.get(`/api/favourites`).pipe(
        pluck('response'),
        switchMap(res => of({ type: FAVOURITES_FETCHED, payload: res })),
        catchError(err => merge(
          of({ type: FAVOURITES_ERROR, payload: err }),
          of(requestNotification("notification", false, 5, err)),
        ))
      )
    ))
  )
}

export const fetchAddFavourite = action$ => {
  return action$.pipe(
    ofType(FAVOURITES_ADD_REQUEST),
    exhaustMap(action => (
      ajax.post(`/api/favourites`, { ...action.item }).pipe(
        pluck('response'),
        switchMap(res => {
          return merge(
            of({ type: FAVOURITES_ADD_FETCHED, payload: res }),
            of(requestNotification('notification', true, 3, "You successfully added new item!"))
          )
        }),
        catchError(err => of(
          { type: FAVOURITES_ADD_ERROR, payload: err },
          requestNotification("notification", false, 5, err),
        ))
      )
    ))
  )
}

export const fetchRemoveFavourite = action$ => {
  return action$.pipe(
    ofType(FAVOURITES_REMOVE_REQUEST),
    exhaustMap(action => (
      ajax.delete(`/api/favourites/${encodeURIComponent(action.id)}`).pipe(
        pluck('response'),
        switchMap(res => {
          return merge(
            of({ type: FAVOURITES_REMOVE_FETCHED, payload: { id: action.id } }),
            of(requestNotification('notification', true, 3, `${res.message}`))
          )
        }),
        catchError(err => of(
          { type: FAVOURITES_REMOVE_ERROR, payload: err },
          requestNotification("notification", false, 5, err),
        ))
      )
    ))
  )
}