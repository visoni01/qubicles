import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function SettingsLeft() {
  return (
    <Box className='custom-box no-padding-top no-padding-bottom'>
      <div className='list-divider'>
        <div className='display-inline-flex is-fullwidth '>
          <FontAwesomeIcon icon={ faUser } className='custom-fa-icon' />
          <h4 className='h4 pl-10'> Account </h4>
        </div>
        <Divider className='divider' />

        <div className='display-inline-flex is-fullwidth'>
          <FontAwesomeIcon icon={ faUser } className='custom-fa-icon' />
          <h4 className='h4 pl-10'> Integrations </h4>
        </div>
        <Divider className='divider' />

        <div className='display-inline-flex is-fullwidth'>
          <FontAwesomeIcon icon={ faUser } className='custom-fa-icon' />
          <h4 className='h4 pl-10'> Rates </h4>
        </div>
      </div>
    </Box>
  )
}
