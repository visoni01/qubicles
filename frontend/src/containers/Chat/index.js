import { Grid } from '@material-ui/core'
import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import MiddleSection from './MiddleSection'
import { members } from './testData'

const ChatSection = () => (
  <div>
    <Grid container spacing={ 3 } justify='center'>
      <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
        <LeftSection />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 9 } sm={ 12 } xs={ 12 }>
        <MiddleSection />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
        <RightSection members={ members } isGroup />
      </Grid>
    </Grid>
  </div>
)

export default ChatSection
