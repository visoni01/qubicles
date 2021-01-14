import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import OtherCompanyOpenPositionsList from './otherCompanyOpenPositionsList'
import CoursesSection from '../../Company/About/CoursesSection'
import ResumeReviews from '../../../People/ContactCenter/Talent/Application/ResumeReviews'

export default function OtherCompanyAbout({ companyId }) {
  return (
    <Grid container spacing={ 4 } justify='flex-start'>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
        <OtherCompanyOpenPositionsList companyId={ companyId } />
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

OtherCompanyAbout.propTypes = {
  companyId: PropTypes.string.isRequired,
}