/* eslint-disable camelcase */
import moment from 'moment'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import config from './config'
import MESSAGES from './messages'

export const formatDate = (date, format = 'MMMM DD, YYYY') => moment(date).format(format)

export const isEmptyObject = (input) => {
  const isObject = Object.prototype.toString.call(input) === '[object Object]'
  const objKeys = Object.keys(input)

  return !(isObject && objKeys && objKeys.length)
}

export const getDataForReducer = (action, initialValue, dataKey) => (
  (action && action.payload && action.payload[ dataKey ]) || initialValue
)

export const getTimeFromNow = (date) => moment(date).fromNow()

export const isProductionEnvironment = () => config.NODE_ENV === 'production'

export const getUserDetails = () => {
  const token = Cookies.get('access_token')
  let userDetails
  if (token) {
    const {
      full_name, user_id, email, is_post_signup_completed, user_code,
    } = jwt.decode(token)
    userDetails = {
      full_name,
      user_id,
      email,
      user_code,
      is_post_signup_completed,
    }
  }

  return userDetails
}

export const getToken = () => Cookies.get('access_token')
export const getPostSignUpStatus = () => {
  const postSignUpStatus = Cookies.get('is_post_signup_completed')
  if (postSignUpStatus === '1') {
    return true
  }
  return false
}

export const getSubstrForNotification = (input) => {
  let subStr = input
  if (input.length > 40) {
    subStr = `${ input.substr(0, 40) }...`
  }
  return subStr
}

export const getFullMessage = (msg) => {
  let fullMessage = msg
  if ((_.isString(msg) && !_.isEmpty(msg))) {
    fullMessage = MESSAGES[ msg.toUpperCase() ] || msg
  }

  return fullMessage
}

export const isUserOwner = (ownerId) => {
  const userData = getUserDetails()
  return ownerId === userData.user_id
}

export const formatCount = (input) => {
  let count = input
  if (Number.isNaN(input)) {
    count = 0
  } else if (input >= 0 && input < 1e3) {
    count = input
  } else if (input >= 1e3 && input < 1e6) {
    count = `${ +(input / 1e3).toFixed(1) }K`
  } else if (input >= 1e6 && input < 1e9) {
    count = `${ +(input / 1e6).toFixed(1) }M`
  } else if (input >= 1e9 && input < 1e12) {
    count = `${ +(input / 1e9).toFixed(1) }B`
  } else {
    count = `${ +(input / 1e12).toFixed(1) }T`
  }

  return count
}

export const shortenFileName = (fileObj) => {
  let fileName = fileObj.name
  fileName = `${ fileName.substr(0, 30) }.${ fileObj.type.split('/')[ 1 ] }`
  return fileName
}
