import React, { useEffect, useCallback, useState } from 'react'
import {
  Box, Button, Grid, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { checkrInvitationFetchingStart } from '../../redux-saga/redux/actions'

const CheckrVerification = () => {
  const { isLoading, invitationLink } = useSelector((state) => state.checkr)
  const [ isClosed, setIsClosed ] = useState(false)
  const dispatch = useDispatch()
  const handleClickButton = useCallback(() => {
    dispatch(checkrInvitationFetchingStart())
  }, [ dispatch ])
  useEffect(() => {
    if (!isLoading && invitationLink) {
      window.open(invitationLink, '_blank')
    }
  }, [ isLoading, invitationLink ])

  return (
    <Box className='box background-check' display={ isClosed ? 'none' : 'block' }>
      <div>
        <IconButton size='small' className='pull-right' onClick={ () => setIsClosed(true) }>
          <FontAwesomeIcon icon={ faTimes } />
        </IconButton>
        <h3 className='heading'>
          Background Screening
        </h3>
        <p className='text'>
          Companies are more likely to hire applicants that passed a background screening test.
        </p>
      </div>
      <div className='background-check-buttons'>
        <Button
          onClick={ () => setIsClosed(true) }
          classes={ {
            root: 'button-secondary-large custom-btn not-now-btn',
            label: 'button-secondary-large-label',
          } }
        >
          Not Now
        </Button>
        <Button
          onClick={ handleClickButton }
          classes={ {
            root: 'button-primary-large custom-btn start-btn',
            label: 'button-primary-large-label',
          } }
        >
          Start
        </Button>
      </div>
    </Box>

  )
}

export default CheckrVerification
