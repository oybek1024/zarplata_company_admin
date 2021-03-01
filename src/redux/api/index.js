import axios from 'axios'
import basic from '../../constants/basic'

export const request = axios.create({
  baseURL: basic.BASE_URL,
})
