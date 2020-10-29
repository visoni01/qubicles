import React from 'react'
import { Box, Popover } from '@material-ui/core'
import './newStyles.scss'

const DisplayError = () => (
  <>
    <Popover open='true' className='box display-error-root'>
      <h3 className='heading'>Ooops!</h3>
      <p className='error-message'>Please fill in all the required fields first</p>
    </Popover>
  </>
)

export default DisplayError
