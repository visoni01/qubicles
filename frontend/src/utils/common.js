import moment from 'moment'

export const formatDate = (date) => moment(date).format('MMMM DD, YYYY')

export const isEmptyObject = (input) => {
  const isObject = Object.prototype.toString.call(input) === '[object Object]'
  const objKeys = Object.keys(input)

  return !(isObject && objKeys && objKeys.length)
}

export const getDataForReducer = (action, initialValue, dataKey) => {
  return ((action && action.payload && action.payload[dataKey]) || initialValue )
}

export const getTimeFromNow = (date) => moment(date).fromNow()
