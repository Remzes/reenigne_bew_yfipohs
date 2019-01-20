import { combineEpics } from 'redux-observable'
import { fetchSearch } from '../ducks/search'
import { networkOnline, networkOffline } from '../ducks/network'
import { callNotification } from '../ducks/notification'

export default combineEpics(fetchSearch, networkOnline, networkOffline, callNotification)