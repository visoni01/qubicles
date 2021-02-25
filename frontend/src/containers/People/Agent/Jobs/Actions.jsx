import React from 'react'
import {
  Box, Button,
} from '@material-ui/core'
import './styles.scss'

const AgentJobActions = () => (
  <>
    <Box className='custom-box actions-box'>
      <h3 className=' h3 mb-30'> Actions </h3>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Apply
      </Button>
    </Box>
  </>
)

export default AgentJobActions
