import { io } from 'socket.io-client'
import configEnv from '../utils/config'
import emitters from './emitters'

const WebSocket = class {
  static socket

  static initialize = ({ userId, listeners }) => {
    WebSocket.socket = io(configEnv.BASE_URL, {
      query: { userId },
      transports: [ 'websocket', 'polling' ],
    })

    listeners.forEach(({ event, callback }) => {
      WebSocket.socket.on(event, callback)
    })

    emitters.forEach(({ method, event }) => {
      WebSocket[ method ] = (data) => {
        WebSocket.socket.emit(event, data)
      }
    })
  }

  static connect = () => {
    WebSocket.socket.connect()
  }

  static disconnect = () => {
    WebSocket.socket.disconnect()
  }
}

export default WebSocket
