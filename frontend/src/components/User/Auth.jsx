import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

import apiClient from '../../utils/apiClient'
import config from '../../utils/config'

const Auth = (props) => {
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

    async function getUser(token) {
      // user object will be stored in redux store or localstorage
      const user = await apiClient.getUser()
      if (window.opener) {
        window.opener.focus()
        window.opener.location.href = `${ config.APP_BASE_URL }/dashboard`
        window.close()
      }
    }
  }, [])
  return (
    <></>
  )
}

Auth.propTypes = {
  location: PropTypes.instanceOf({
    search: PropTypes.string,
  }),
}

Auth.defaultProps = {
  location: {
    search: '',
  },
}

export default Auth
