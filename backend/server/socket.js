import socketIo from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import _ from 'lodash'
import logger from '../app/common/logger'
import config from '../config/app'
import { EVENTS } from '../app/utils/success'
import { addUserNotification } from '../app/services/helper'

const createSocketConnection = (server) => {
  try {
    const io = socketIo(server, {
      cors: {
        origin: [config.get('webApp.baseUrl'), 'https://admin.socket.io']
      }
    })

    io.on('connection', (socket) => {
      if (!_.isEqual(socket.handshake.query.userId, 'undefined')) {
        socket.join(socket.handshake.query.userId)
      }

      socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          socket.connect()
        }
      })

      socket.on(EVENTS.SEND_NOTIFICATION, async ({ to, message }) => {
        try {
          await addUserNotification({ user_id: to, notice: message })
          io.to(to.toString()).emit(EVENTS.RECEIVE_NOTIFICATION, message)
        } catch (e) {
          logger.error('Error while adding user notification =====>', e)
        }
      })

      socket.on(EVENTS.JOIN_ROOM, (id) => {
        socket.handshake.query.userId = id
        socket.join(id.toString())
      })
    })

    instrument(io, { auth: false })
  } catch (e) {
    logger.error('Error while connecting to socket =====>', e)
  }
}

export default createSocketConnection