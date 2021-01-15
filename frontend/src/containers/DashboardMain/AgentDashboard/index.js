import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import TodayActivity from '../../../components/Dashboard/RightSection/TodaysActivity'
import LatestAnnouncement from '../../../components/Dashboard/LeftSection/LatestAnnouncement'
import ContactsModal from './contacts'

const AgentDashboard = () => {
  const [ openContactsModal, setOpenContactsModal ] = useState(true)
  return (
    <div>
      <Grid container spacing={ 3 }>
        {/*  Left Section */}
        <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
          <TodayActivity />
          <LatestAnnouncement />
        </Grid>
        <Grid item xl={ 9 } lg={ 9 } md={ 12 } sm={ 12 } xs={ 12 }>
          Images
          <ContactsModal
            open={ openContactsModal }
            onClose={ () => setOpenContactsModal(false) }
            onSubmit={ () => setOpenContactsModal(false) }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default AgentDashboard
