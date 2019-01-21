import { createSelector } from 'reselect'

export const inputSelector = state => state.form.values.keywords
export const searchedData = state => state.search
export const favouritesData = state => state.favourites

export const search = createSelector(searchedData, values => values)
export const favourites = createSelector(favouritesData, values => values)