import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import ClientDashboard from './ClientDashboard/index'
import AgentDashboard from './AgentDashboard/index'
import InviteModal from '../InviteFriendsPage/InviteModal'
import { hideInvitePopup } from '../../redux-saga/redux/user/login'
import { USERS } from '../../utils/constants'

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
        {_.isEqual(userDetails.user_code, USERS.EMPLOYER) && (
          <ClientDashboard />
        )}

        {[ USERS.AGENT, USERS.TRAINER, USERS.SUPERVISOR, USERS.QA_SUPPORT ].includes(userDetails.user_code) && (
          <AgentDashboard />
        )}

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
