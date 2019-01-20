import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import searchReducer from '../ducks/search'
import favouritesReducer from '../ducks/favourites'

export default combineReducers({search: searchReducer, favourites: favouritesReducer, form})