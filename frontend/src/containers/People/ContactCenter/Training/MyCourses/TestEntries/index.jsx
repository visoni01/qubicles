import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ROUTE_PATHS from '../../../../../../routes/routesPath'
import TestEntryCard from './testEntryCard'

const TestEntries = () => {
  const history = useHistory()

  return (
    <Box className='custom-box'>
      <div className='mb-30'>
        <Button
          onClick={ () => history.push(ROUTE_PATHS.MY_COURSES) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          Back
        </Button>
      </div>
      <div className='mb-20'>
        <h2 className='h2 mb-30'>
          History, Values and More Things To Know About Our Company
        </h2>
        <h3 className='h3 mb-10'>Test Entries (11)</h3>
        <p className='para light'>
          {'Some answers in your tests need manual validation.'
          + ' Please check the test entries of the following participants.'}
        </p>
      </div>
      <div>
        <Grid container spacing={ 3 }>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
            <TestEntryCard />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
            <TestEntryCard />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
            <TestEntryCard />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
            <TestEntryCard />
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

export default TestEntries
