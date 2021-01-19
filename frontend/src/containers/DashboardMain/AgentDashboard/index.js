import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import ContactsModal from './contacts'
import AgentTodayActivity from './AgentTodayActivity'
import './style.scss'
import AgentStats from './AgentStats'
import CallButtons from './CallButtons'

const AgentDashboard = () => {
  const [ openContactsModal, setOpenContactsModal ] = useState(false)
  return (
    <div>
      <Grid container spacing={ 3 }>
        <CallButtons />
        <Grid item container spacing={ 4 }>
          {/*  Left Section */}
          <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
            <AgentTodayActivity />
          </Grid>
          <Grid item xl={ 9 } lg={ 9 } md={ 12 } sm={ 12 } xs={ 12 }>
            <AgentStats />
            <ContactsModal
              open={ openContactsModal }
              onClose={ () => setOpenContactsModal(false) }
              onSubmit={ () => setOpenContactsModal(false) }
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default AgentDashboard
