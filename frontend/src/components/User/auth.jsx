import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import _ from 'lodash'
import apiClient from '../../utils/apiClient'
import config from '../../utils/config'

const Auth = () => {
  useEffect(() => {
    const isEmailVerified = Cookies.get('is_email_verified')
    if (isEmailVerified === 'false' && window.opener) {
      Cookies.remove('is_email_verified')
      window.opener.focus()
      window.opener.location.href = `${ config.APP_BASE_URL }/signup?with_social=true`
      window.close()
    } else {
      getUser()
    }

    async function getUser() {
      // user object will be stored in redux store or localstorage
      await apiClient.getUser()
      if (window.opener) {
        window.opener.focus()
        const isReturnTo = window.opener.location.href.split('?return_url=')
        if (isReturnTo && !_.isUndefined(isReturnTo[ 1 ])) {
          window.opener.location.href = `${ config.APP_BASE_URL }${ isReturnTo[ 1 ] }`
        } else { window.opener.location.href = `${ config.APP_BASE_URL }/dashboard` }
        window.close()
      }
    }
  }, [])
  return (
    <></>
  )
}

export default Auth
