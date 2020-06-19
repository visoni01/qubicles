import { USER_LEVEL } from '../../services/user/getSecurityContext'

// Here we are separating the combined values
// Input example: ' AGENTDIRECT LeadCrowdInbound NewTFNInboundQueue UveaousTechInbound -'
export const splitCombinedFieldValuesForGroup = (combinedFieldValues) => {
  let values = combinedFieldValues && combinedFieldValues.split(' ')
  if (values && values.length) {
    values = values.filter((value) => {
      const str = value.trim()
      return (str !== '-' && str !== '')
    })
  }
  return values
}

export const createNewEntity = async ({ model, data }) => {
  const dataValues = await model.create(data)
  return dataValues.get({ plain: true })
}

export const generateUUID = () => {
  let time = new Date().getTime()
  // Generating 16 digits long random id
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const number = (time + Math.random() * 16) % 16 | 0
    time = Math.floor(time / 16)
    return (c == 'x' ? number : (number&0x3|0x8)).toString(16)
  })
  return uuid
}

export const isInvalidClientIdAndUserLevel = ({ clients, flowClientId,  user_level }) => {
  let isClientIdMatched = false
  // here we're checking if flowClientId matches with any clients client_id or not
  for (let index = 0; index < clients.length; index++) {
    if (clients[index].client_id == flowClientId) {
      isClientIdMatched = true
      break
    }
  }
  
  return ( !isClientIdMatched && user_level != USER_LEVEL.SYSTEM)
}