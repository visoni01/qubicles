import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClientDashboard from './ClientDashboard/index'
import AgentDashboard from './AgentDashboard/index'
import InviteModal from '../InviteFriendsPage/InviteModal'
import { hideInvitePopup } from '../../redux-saga/redux/login'

const DashboardMain = () => {
  const { userDetails, openInvitePopup } = useSelector((state) => state.login)
  const [ openInviteModal, setOpenInviteModal ] = useState(openInvitePopup)
  const dispatch = useDispatch()

  const handleCloseInviteModal = useCallback(() => {
    setOpenInviteModal(false)
    dispatch(hideInvitePopup())
  }, [ dispatch ])

  if (userDetails && userDetails.is_post_signup_completed) {
    return (
      <>
        { userDetails.user_code === 'employer' && (<ClientDashboard />)}
        { userDetails.user_code !== 'employer' && (<AgentDashboard />)}
        <InviteModal
          open={ openInviteModal }
          handleClose={ handleCloseInviteModal }
        />
      </>
    )
  }
  return (<> </>)
}

export default DashboardMain
