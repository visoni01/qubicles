import React from 'react'
import { Button, Box } from '@material-ui/core'

export default function NewJobActions() {
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
          Publish
        </Button>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Save Draft
        </Button>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Preview
        </Button>
      </Box>

    </>
  )
}
