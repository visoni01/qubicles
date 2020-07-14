import moment from 'moment'
import config from '../utils/config'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

export const formatDate = (date, format = 'MMMM DD, YYYY') => moment(date).format(format)

export const isEmptyObject = (input) => {
  const isObject = Object.prototype.toString.call(input) === '[object Object]'
  const objKeys = Object.keys(input)

  return !(isObject && objKeys && objKeys.length)
}

export const getDataForReducer = (action, initialValue, dataKey) => ((action && action.payload
  && action.payload[ dataKey ]) || initialValue)

export const getTimeFromNow = (date) => moment(date).fromNow()

export const isProductionEnvironment = () => {
  return config.NODE_ENV === 'production'
}

export const getUserDetails = () => {
  const token = Cookies.get('access_token')
  let userDetails
  if (token) {
    const { full_name, user_id, email } = jwt.decode(token)
    userDetails = {
      full_name, 
      user_id, 
      email
    }
  }
  
  return userDetails
}
