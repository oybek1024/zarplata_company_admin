const token = localStorage.getItem('token')
const websocket = new WebSocket(`ws://websocket.muno.uz/ws?Authorization=${token}`)
websocket.onopen = () => {
    console.log('Muno socket connecting.....')
}
websocket.onmessage = (e) => {
    console.log('WebSocket message received: ', e)
}


