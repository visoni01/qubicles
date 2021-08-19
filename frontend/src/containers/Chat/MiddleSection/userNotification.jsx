import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UserNotification = ({ message }) => {
  const { userDetails } = useSelector((state) => state.login)

  useEffect(() => {
    const elements = document.getElementsByClassName(userDetails && userDetails.user_id)
    if (elements.length > 0) {
      Array.from(elements).forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.innerHTML = 'You'
      })
    }
  }, [ userDetails ])

  return (
    <div
      className='para text-center mt-10 mb-20'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={ { __html: message } }
    />
  )
}

UserNotification.propTypes = {
  message: PropTypes.string.isRequired,
}

export default UserNotification
