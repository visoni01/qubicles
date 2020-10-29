import React from 'react'
import {
  Button, Box, Divider, Grid,
} from '@material-ui/core'
import TextDivider from '../../TextDivider'

export default function JobApplicationActions() {
  return (
    <>
      <Box className='box actions-box'>
        <h3 className='heading'> Actions </h3>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Hire
        </Button>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Message
        </Button>
        <div className='mt-30'>
          <TextDivider message='Evaluating' />
        </div>
        <div className='mb-30'>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Move to Screening
          </Button>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Invite for Interview
          </Button>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Move to Training
          </Button>
        </div>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
        >
          Reject
        </Button>
      </Box>
    </>
  )
}
