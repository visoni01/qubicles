import React from 'react'
import { Box, Button, Divider } from '@material-ui/core'

const NewCourseActions = () => (
  <Box className='custom-box actions-box wrapper'>
    <h3 className='h3 heading'> Actions </h3>
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
      Preview
    </Button>
    <Divider className='divider-padded' />
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Save Draft
    </Button>
  </Box>
)

export default NewCourseActions
