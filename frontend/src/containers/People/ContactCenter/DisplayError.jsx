import React from 'react'
import { Box, Popover } from '@material-ui/core'
import './styles.scss'

const DisplayError = () => (
  <>
    <Box open='true' className='custom-box mb-25 display-error-root'>
      <h3 className='h3 mb-15'>Ooops!</h3>
      <p className='error-message'>Please fill in all the required fields first</p>
    </Box>
  </>
)

export default DisplayError
