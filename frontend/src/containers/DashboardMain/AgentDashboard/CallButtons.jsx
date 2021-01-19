import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

export default function CallButtons() {
  return (
    <Grid item container spacing={ 3 } direction='row' className='calls-buttons'>
      <Grid item lg={ 2 }>
        <Button
          classes={ {
            root: 'button-primary-large',
            label: 'button-primary-large-label call-btn-label pl-10 pr-20',
          } }
        >
          Waiting For A Call
        </Button>
      </Grid>
      <Grid item container justify='flex-start' spacing={ 2 } lg={ 10 }>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large',
              label: 'button-secondary-large-label call-btn-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon' />
            }
          >
            Manual Dial
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large',
              label: 'button-secondary-large-label call-btn-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon' />
            }
          >
            Manual Dial
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large',
              label: 'button-secondary-large-label call-btn-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon' />
            }
          >
            Manual Dial
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large',
              label: 'button-secondary-large-label call-btn-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon' />
            }
          >
            Manual Dial
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large',
              label: 'button-secondary-large-label call-btn-label',
            } }
            startIcon={
              <FontAwesomeIcon icon={ faBriefcase } className='custom-fa-icon' />
            }
          >
            Manual Dial
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
