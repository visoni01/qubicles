import React from 'react'
import { Box, Button, Divider } from '@material-ui/core'

const NewCourseActions = () => (
  <Box className='custom-box actions-box wrapper'>
    <h3 className='h3 mb-15'> Actions </h3>
    <div className='mb-10'>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Publish
      </Button>
    </div>
    <div className='mb-10'>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
      >
        Preview
      </Button>
    </div>
    <Divider className='divider-padded' />
    <div className='mb-10'>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
      >
        Save Draft
      </Button>
    </div>
  </Box>
)

export default NewCourseActions
