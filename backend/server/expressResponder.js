import logger from '../app/common/logger'
import _ from 'lodash'

function Responder () { }

/*
 * This method sends the response to the client.
 */
function sendResponse (res, status, body) {
  if (!res.headersSent) {
    if (body) { return res.status(status).json(body) }
    return res.status(status).send()
  } else {
    logger.error('Response already sent.')
  }
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.sendJSONResponse = (res, obj) => {
  return sendResponse(res, 200, obj)
}

Responder.success = (res, message) => {
  message = _.isString(message) ? { message } : message
  return sendResponse(res, 200, { result: message })
}

export default Responder
