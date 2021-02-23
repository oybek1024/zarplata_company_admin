import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import authReducer from './authReducer'
import systemReducer from './systemReducer'
import basicReducer from "./basicReducer";
import crudReducer from "./crudReducer";

const appReducer = combineReducers({
  auth: authReducer,
  system: systemReducer,
  basics: basicReducer,
  crud: crudReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
