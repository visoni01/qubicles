import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import OpenPositions from './openPositions'
import CoursesSection from './coursesSection'
import CompanyReviews from './companyReviews'

export default function About() {
  const { userDetails } = useSelector((state) => state.login)

  return (
    <Grid container spacing={ 4 } justify='flex-start'>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <OpenPositions />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <CoursesSection />
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <CompanyReviews companyId={ userDetails.user_id } />
      </Grid>
    </Grid>
  )
}
