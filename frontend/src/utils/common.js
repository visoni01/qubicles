/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import moment from 'moment'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import config from './config'
import MESSAGES from './messages'
import { COMPANY_PROFILE_ROUTE, JOB_ROUTE, PROFILE_ROUTE } from '../routes/routesPath'

export const regExpPhone = /^[+](\d{1,4})?\s(\d{10})$/
export const regExpSSN = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/
export const regExpZip = /^([a-zA-Z][0-9][a-zA-Z])\s*([0-9][a-zA-Z][0-9])$/
export const regSplChar = /^[^!@#$%^&*(),.?":{}|<>]*$/
// export const regSplChar = /^[^<>'\"/;`%]*$/

export const formatDate = (date, format = 'DD MMM') => moment(date).format(format)

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
      full_name, user_id, email, is_post_signup_completed, user_code, inviteLink,
    } = jwt.decode(token)
    userDetails = {
      full_name,
      user_id,
      email,
      user_code,
      is_post_signup_completed,
      inviteLink,
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

export const getPhoneNumber = (value, countryData) => `+${ countryData.dialCode } ${ value }`

// This method is used to format phone number as per e.g. +1 5555555555
export const phoneNumberFormatter = (number, countryData) => {
  if (number.match(/([()])|^\d{10}$/g)) {
    const formattedNum = number.replace(/([()])|-|\s|\+/g, '')
    return `+${ countryData.dialCode } ${ formattedNum }`
  }
  return number
}

export const spreadArgs = (handler) =>
  // Spreading the arguments over the handler.
  (args) => handler(...args)

// This method is used for formatting SSN as per e.g. 111-11-2001
export const formatSSN = (value) => {
  let val = value.replace(/\D/g, '')
  let newVal = ''
  if (val.length > 4) {
    // eslint-disable-next-line no-param-reassign
    value = val
  }
  if ((val.length > 3) && (val.length < 6)) {
    newVal += `${ val.substr(0, 3) }-`
    val = val.substr(3)
  }
  if (val.length > 5) {
    newVal += `${ val.substr(0, 3) }-`
    newVal += `${ val.substr(3, 2) }-`
    val = val.substr(5)
  }
  newVal += val
  return newVal.substring(0, 11)
}

export const checkJobType = (jobType) => {
  if (jobType === 'fulltime') {
    return 'Full time'
  }
  if (jobType === 'parttime') {
    return 'Part time'
  }
  return 'Contract'
}

export const setDoumentTitle = ({ location }) => {
  let title = 'award-winning contact center blockchain company'

  // First level path name check
  if (location && location.pathname && location.pathname.split('/').length > 1) {
    const pathArray = location.pathname.split('/')
    const rootDir = pathArray[ 1 ]

    if ([ 'people', 'dashboard', 'profile', 'groups',
      'wallet', 'programs', 'insights', 'settings' ].includes(rootDir)) {
      // Second level path name check
      if (pathArray.length > 2) {
        const firstChildDir = pathArray[ 2 ]

        // People Sub Pages
        if (rootDir === 'people') {
          if ([ 'jobs', 'talent', 'training', 'applications' ].includes(firstChildDir)) {
            title = firstChildDir
          }
        }
      } else title = rootDir
    }
  }
  document.title = `qubicles.io – ${ title }`
}

export const getUniqueId = () => (Date.now() + Math.random()).toString()

export const getNotificationMessage = ({ type, payload }) => {
  switch (type) {
    case 'follow': {
      return `<span><a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${ payload.id }/feed" target="_blank">${
        payload.name }</a> started following you.</span>`
    }

    case 'cancel-application': {
      return `<span>We're sorry <a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${
        payload.id }/feed" target="_blank">${ payload.name }</a>, but your application for <a href="${
        JOB_ROUTE }/${ payload.jobId }" target="_blank">${ payload.jobTitle }</a> has been cancelled.</span>`
    }

    case 'invite-for-job': {
      return `<span>Hi <a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${ payload.id }/feed" target="_blank">${
        payload.name }</a>. You have been invited to join <a href="${ JOB_ROUTE }/${ payload.jobId }" target="_blank">${
        payload.jobTitle }</a>!</span>`
    }

    case 'hire-for-job': {
      return `<span>Congratulations, <a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${
        payload.id }/feed" target="_blank">${ payload.name }</a>! You have been hired for the position <a href="${
        JOB_ROUTE }/${ payload.jobId }" target="_blank">${ payload.jobTitle }</a> with Company <a href="${
        COMPANY_PROFILE_ROUTE }/${ payload.companyId }/feed" target="_blank">${ payload.companyName }</a>!</span>`
    }

    case 'job-applied': {
      return `<span><a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${ payload.userId }/resume" target="_blank">${
        payload.userName }</a> just applied to your job
        <a href="${ JOB_ROUTE }/${ payload.jobId }" target="_blank">${ payload.jobTitle }</a>.</span>`
    }

    case 'accept-job-invitation': {
      return `<span><a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${ payload.userId }/resume" target="_blank">${
        payload.userName }</a> has accepted your invitation
        <a href="${ JOB_ROUTE }/${ payload.jobId }" target="_blank">${ payload.jobTitle }</a>.</span>`
    }

    case 'resign-job': {
      return `<span><a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${ payload.userId }/resume" target="_blank">${
        payload.userName }</a> has resigned from your job
        <a href="${ JOB_ROUTE }/${ payload.jobId }" target="_blank">${ payload.jobTitle }</a>.</span>`
    }

    case 'referral-signup': {
      return `<span>Congrats - you’ve just earned free crypto! <a href="${ config.APP_BASE_URL }${ PROFILE_ROUTE }/${
        payload.id }/feed" target="_blank">${ payload.name }</a> has accepted your invitation to sign up!</span>`
    }

    default: return ''
  }
}
