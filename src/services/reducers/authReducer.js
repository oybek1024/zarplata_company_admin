import {
  SET_AUTH_CREDENTIALS,
  SET_AUTH_TOKENS,
  CLEAR_ON_SIGNOUT,
} from '../constants'

const INITIAL_STATE = {
  phoneNumber: '',
  accessToken: '',
  refreshToken: '',
}

export default function authReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case SET_AUTH_CREDENTIALS:
      return {
        ...state,
        phoneNumber: payload,
      }
    case SET_AUTH_TOKENS:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      }
    case CLEAR_ON_SIGNOUT:
      return {
        ...state,
        accessToken: '',
        refreshToken: '',
      }
    default:
      return state
  }
}
