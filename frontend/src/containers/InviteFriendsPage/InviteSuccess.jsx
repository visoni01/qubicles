import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import invitePopup from '../../assets/images/popup.png'

export default function InviteSuccess({ inviteSuccess }) {
  const [ timer, setTimer ] = useState(4)
  useEffect(() => {
    if (inviteSuccess) {
      setTimeout(() => {
        setTimer((current) => (current - 1))
      }, 1000)
      if (timer < 1) {
        window.close()
      }
    }
  })
  if (inviteSuccess) {
    return (
      <Box className='custom-box invite-success-box'>
        <div className='text-align-last-center mb-30'>
          <div className='popup-image'>
            <img src={ invitePopup } alt='popup' />
          </div>
          <div>
            <h2 className='h2'> Contacts invited successfully!</h2>
            <h3 className='h3'>
              {`Closing window in ${ timer } seconds...`}
            </h3>
          </div>
        </div>
      </Box>
    )
  }
  return (
    <Box className='custom-box'>
      <div className='text-align-last-center'>
        <div>
          <h2 className='h2'>Oops! 400 Bad request</h2>
        </div>
      </div>
    </Box>
  )
}

InviteSuccess.defaultProps = {
  inviteSuccess: false,
}

InviteSuccess.propTypes = {
  inviteSuccess: PropTypes.bool,
}
