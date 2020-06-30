import moment from 'moment'

export const formatDate = (date) => moment(date).format('MMMM DD, YYYY')

export const isEmptyObject = (input) => {
  const isObject = Object.prototype.toString.call(input) === '[object Object]'
  const objKeys = Object.keys(input)

  return !(isObject && objKeys && objKeys.length)
}
