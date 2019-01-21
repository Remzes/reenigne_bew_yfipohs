import { combineEpics } from 'redux-observable'
import { fetchSearch } from '../ducks/search'
import { networkOnline, networkOffline } from '../ducks/network'
import { callNotification } from '../ducks/notification'
import { fetchAddFavourite, fetchRemoveFavourite, fetchFavourites } from '../ducks/favourites'

export default combineEpics(fetchSearch, networkOnline, networkOffline, fetchAddFavourite, fetchRemoveFavourite, fetchFavourites, callNotification)