import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer'
import systemReducer from './systemReducer'
import basicReducer from "./basicReducer";

const appReducer = combineReducers({
  auth: authReducer,
  system: systemReducer,
  basics: basicReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
