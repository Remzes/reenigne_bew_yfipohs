import { ofType } from 'redux-observable'
import { exhaustMap, switchMap, pluck, takeUntil } from 'rxjs/operators'
import { of, from, Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { FAVOURITES_ADD_FETCHED_FURTHER_UPDATE } from './favourites'

const appName = "wizard"
export const moduleName = "search"

export const SEARCH_REQUEST = `${appName}/${moduleName}/SEARCH_REQUEST`
export const SEARCH_FETCHED = `${appName}/${moduleName}/SEARCH_FETCHED`
export const SEARCH_ERROR = `${appName}/${moduleName}/SEARCH_ERROR`

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
    case SEARCH_REQUEST:
      return { ...state, fetching: true, fetched: false, error: null, success: false, data: [], message: '' }
    case SEARCH_FETCHED:
      return { ...state, fetching: false, fetched: true, error: null, success: true, data: payload.data, message: '' }
    case SEARCH_ERROR:
      return { ...state, fetching: false, fetched: true, error: true, success: false, data: [], message: payload.err }
    case FAVOURITES_ADD_FETCHED_FURTHER_UPDATE:
      console.log("I WILL CHANGE RIGHT NOW!")
      data = [...state.data]
      const index = data.findIndex(e => e.title === payload.item.title)
      data[index].isFav = true
      return { ...state, data }
    default:
      return state
  }
}

// ACTIONS
export const requestSearch = (text = '') => ({ type: SEARCH_REQUEST, text })

// EPICS
export const fetchSearch = action$ => {
  return action$.pipe(
    ofType(SEARCH_REQUEST),
    exhaustMap(action => (
      ajax.get(`/api/wizard?search=${action.text}`).pipe(
        pluck('response'),
        switchMap(res => {
          return of({ type: SEARCH_FETCHED, payload: {data: res.data} })
        }),
      )
    ))
  )
}