import React from 'react'
import { Grid } from '@material-ui/core'
import OpenPositions from '../../Company/About/OpenPositions'
import CoursesSection from '../../Company/About/CoursesSection'
import ResumeReviews from '../../../NewPeople/ContactCenter/Talent/Application/ResumeReviews'

export default function OtherCompanyAbout() {
  return (
    <Grid container spacing={ 4 } justify='flex-start'>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <OpenPositions />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <CoursesSection />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <ResumeReviews />
      </Grid>
    </Grid>
  )
}
