import { notification } from 'antd'


const token = localStorage.getItem('token')
const websocket = new WebSocket(`ws://websocket.muno.uz/ws?Authorization=${token}`)

const socket = {
    start() {
        if (token) {
            websocket.onopen = () => {
                console.log('Muno socket connecting.....')
            }
        }
    }
}
websocket.onmessage = (e) => {
    console.log('WebSocket message received: ', e)
    notification.warning({
        message: 'WebSocket Notification',
        description: e
    })
}
export default socket


