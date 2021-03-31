import axios from 'axios'
import { notification } from 'antd'

const token = localStorage.getItem('token')
function alert(title, des) {
  notification.error({
    message: title,
    description: des,
  })
}
function Redirect(msg, hooks) {
  alert(msg)
  localStorage.removeItem('token')
  hooks.history.push('/login')
}

function ErrorHandler(error, hooks) {
  // console.log(hooks)
  if (error.message.startsWith('timeout')) {
    alert('Time Out', 'Please check your internet!')
  }
  if (error.response) {
    // debugger
    let _error = error.response
    switch (_error.status) {
      case 400:
        alert('Bad request')
        break
      case 401:
        Redirect('Unauthorized', hooks)
        break
      case 403:
        alert('Forbidden')
        break
      case 404:
        alert('Not Found')
        break
      case 500:
        alert('Internal Server Error')
        break
      default:
        break
    }
  }
}

const init = {
  request(method, url, params, data, hooks, formdata = false) {
    let config = {
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: 30000,
      url: url,
      method: method,
      onUploadProgress: function (e) {
        Math.round((e.loaded * 100) / e.total)
      },
    }
    if (token) {
      config.headers = {
        Authorization: token,
      }
    }
    if (data) config.data = data

    if (params) config.params = params

    let result = axios(config)

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          ErrorHandler(error, hooks)
          reject(error)
        })
    })
    // axios(config).then(res => {
    //     return Promise.resolve(res.data)
    // })
    // .catch(error => {
    //     ErrorHandler(error)
    // })
    // return axios(config)
  },
  get(url, params, hooks) {
    return this.request('GET', url, params, undefined, hooks)
  },
  post(url, data, params, hooks) {
    return this.request('POST', url, params, data, hooks)
  },
  put(url, data, params, hooks) {
    return this.request('PUT', url, params, data, hooks)
  },
  remove(url, data, params, hooks) {
    return this.request('DELETE', url, params, undefined, hooks)
  },
}

export default init
