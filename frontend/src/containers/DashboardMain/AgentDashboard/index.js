import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import CallButtons from './CallButtons'
import './style.scss'
import AgentActiveCallPage from './agentActiveCallPage'
import AgentInactiveCallPage from './agentInactiveCallPage'
import CallbackModal from './callback'
import CallLogsModal from './callLogs'
import ContactsModal from './contacts'

const AgentDashboard = () => {
  const [ openContactsModal, setOpenContactsModal ] = useState(false)
  const [ openCallbackModal, setOpenCallbackModal ] = useState(false)
  const [ openCallLogsModal, setOpenCallLogsModal ] = useState(false)
  const [ activeCall, setActiveCall ] = useState(false)
  return (
    <div>
      <Grid container>
        <CallButtons
          setOpenContactsModal={ setOpenContactsModal }
          setOpenCallbackModal={ setOpenCallbackModal }
          setOpenCallLogsModal={ setOpenCallLogsModal }
          activeCall={ activeCall }
          setActiveCall={ setActiveCall }
        />
      </Grid>
      {activeCall
        ? (
          <AgentInactiveCallPage />)
        : (
          <AgentActiveCallPage />
        )}
      <ContactsModal
        open={ openContactsModal }
        onClose={ () => setOpenContactsModal(false) }
        onSubmit={ () => setOpenContactsModal(false) }
      />
      <CallbackModal
        open={ openCallbackModal }
        onClose={ () => setOpenCallbackModal(false) }
        onSubmit={ () => setOpenCallbackModal(false) }
      />
      <CallLogsModal
        open={ openCallLogsModal }
        onClose={ () => setOpenCallLogsModal(false) }
        onSubmit={ () => setOpenCallLogsModal(false) }
      />
    </div>
  )
}

export default AgentDashboard
