import { GET_CLIENTS } from '../constants/crud'

const INITIAL_STATE = {
    clients: [],
}

export default function crudReducer(state = INITIAL_STATE, { payload, type }) {
    switch (type) {
        case GET_CLIENTS:
            return {
                ...state,
                clients: payload,
            }
        default:
            return state
    }
}
