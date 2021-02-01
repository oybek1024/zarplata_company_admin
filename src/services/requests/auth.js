import { request } from '../api'

const auth = {
  login: (data) => request.post(`/authenticate`, data),
  signup: (data) => request.post(`/account/signup/`, data),
  verifyCode: (data) => request.post(`/account/verify-code/`, data),
  recover: (data) => request.post(`/account/recover/`, data),
  verifyCodePassword: (data) =>
    request.post(`/account/verify-code-password/`, data),
  resetPassword: (data) => request.post(`/account/reset-password/`, data),
}

export default auth
