import { GET_CLIENTS } from '../constants/crud'


export const getClients = (data) => ({
    type: GET_CLIENTS,
    payload: data
})
