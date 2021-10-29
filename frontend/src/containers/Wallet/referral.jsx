import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ROUTE_PATHS from '../../routes/routesPath'
import InviteModal from '../InviteFriendsPage/InviteModal'

const Referral = () => {
  const [ openInviteModal, setOpenInviteModal ] = useState(false)

  const history = useHistory()

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <>
      <Box className='custom-box wallet-root mt-30'>
        <h3 className=' h3 mb-10'> How To Earn QBE </h3>
        <div className='display-inline-flex '>
          <ul className='ml-20 referral-list'>
            <li>
              <p
                className='para'
                onClick={ () => setOpenInviteModal(true) }
              >
                <span className='primary-text-link'> Invite friends </span>
                {' '}
                with your referral code
                {' '}
              </p>
            </li>
            <li>
              <p className='para'> Earn QBE by getting hired </p>
            </li>
            <li>
              <p className='para'> Get rewarded for exceeding performance like employer of the week </p>
            </li>
            <li>
              <p className='para'>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <span
                  className='primary-text-link'
                  onClick={ () => history.push(ROUTE_PATHS.CREATE_COURSE) }
                >
                  Create courses
                </span>
                {' '}
                and earn with each enrollment
              </p>
            </li>
            <li>
              <p className='para'> Add funds to your savings and earn interest rates </p>
            </li>
          </ul>
        </div>
      </Box>

      <InviteModal
        open={ openInviteModal }
        handleClose={ () => setOpenInviteModal(false) }
      />
    </>
  )
}

export default Referral
