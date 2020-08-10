import { USER_LEVEL } from '../../services/user/getSecurityContext'
import config from '../../../config/app'
import { SqlHelper } from '../../utils/sql'
import _ from 'lodash'
import moment from 'moment'
import { executeUpdateQuery } from '../../utils/queryManager'

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

export const updateEntity = async ({ model, data }) => {
  return executeUpdateQuery({
    method: 'update',
    model,
    data
  })
}

export const generateUUID = () => {
  let time = new Date().getTime()
  // Generating 16 digits long random id
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const number = (time + Math.random() * 16) % 16 | 0
    time = Math.floor(time / 16)
    return (c === 'x' ? number : (number & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export const isAuthorizedForClient = ({ clients, client_id, user_level }) => {
  let isClientIdMatched = false
  // here we're checking if client_id matches with any clients client_id or not
  for (let index = 0; index < clients.length; index++) {
    if (clients[index].client_id === client_id) {
      isClientIdMatched = true
      break
    }
  }

  // user must be part of client or be a system user to be authorized for client
  return (isClientIdMatched || user_level === USER_LEVEL.SYSTEM)
}

export const listsFieldsColumnExists = async ({ list_id, columnName }) => {
  const dbName = config.get('sequelize.name')
  const sql = `SELECT * from INFORMATION_SCHEMA.COLUMNS \
              WHERE TABLE_SCHEMA = '${dbName}' AND \
              TABLE_NAME='x_leads_custom_${list_id}' AND \
              COLUMN_NAME='${columnName}' LIMIT 1;`

  const data = await SqlHelper.select(sql)
  const isColumnExist = !_.isEmpty(data)
  return isColumnExist
}

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const getFirstElement = (input) => {
  const isArray = Object.prototype.toString.call(input) === '[object Array]'
  return (isArray && input[0]) || ''
}

export const getArchiveTableName = (model) => {
  return `${model.tableName}_archive`
}

export const getHistoricalTableName = (model) => {
  return `${model.tableName}_historical`
}

export const getErrorMessageForService = (serviceName) => {
  return `Error while executing the service ${serviceName} =====>`
}

export const createDate = ({ year, month, day, hours, minutes, seconds }) => {
  return moment(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`, 'MM/DD/YYYY HH:mm:ss A')
}

export const fixDigits = (input, digit) => {
  return Number(parseFloat(input)).toFixed(digit)
}

// This method works same as class System.Dynamic.ExpandoObject()
// For Example:
// input = {name: 'example'}
// output = [{Key: 'name', Value: 'example'}]
export const expandoObject = (input) => {
  const customData = []
  for (const property in input) {
    customData.push(
      {
        Key: property,
        Value: input[property]
      }
    )
  }

  return customData
}

// This method is used for flat the array (one level).
// For Example:
// input: [[{name: 'abc'}], [{name: 'xyz'}], {}, {}]
// output: [{name: 'abc'}, {name: 'xyz'}]
export const flatArray = (input) => {
  let flatFilteredArray = []
  input.forEach((data) => {
    if (!_.isEmpty(data)) {
      flatFilteredArray = [...flatFilteredArray, ...data]
    }
  })

  return flatFilteredArray
}

export const isValidImageFile = (fileObj) => {
  const isImage = ['image/jpeg', 'image/png'].includes(fileObj.mimetype)
  return isImage
}
