import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware()
const enhancer = applyMiddleware(epicMiddleware)
const store = createStore(rootReducer, enhancer)
epicMiddleware.run(rootEpic)

window.store = store
export default store