import { XLiveCall } from '../../db/models'

export const getCallByCallerId = async ({ callerId }) => {
  return XLiveCall.findOne({ where: { callerid: callerId }, raw: true })
}
