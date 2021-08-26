import { io } from 'socket.io-client'
import configEnv from '../utils/config'
import emitters from './emitters'

const WebSocket = class {
  static socket

  static listeners

  static initialize = ({ userId, listeners }) => {
    if (listeners) {
      WebSocket.listeners = listeners
    }

    WebSocket.socket = io(configEnv.NODE_URL, {
      query: { userId },
      transports: [ 'websocket', 'polling' ],
    })

    WebSocket.listeners.forEach(({ event, callback }) => {
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
