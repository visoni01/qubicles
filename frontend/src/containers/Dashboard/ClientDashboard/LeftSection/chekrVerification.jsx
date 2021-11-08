import React, { useEffect, useCallback, useState } from 'react'
import {
  Box, Button, IconButton, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { checkrInvitationFetchingStart } from '../../../../redux-saga/redux/actions'

const CheckrVerification = () => {
  const [ isClosed, setIsClosed ] = useState(false)

  const { isLoading, invitationLink } = useSelector((state) => state.checkr)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && invitationLink) {
      window.open(invitationLink, '_blank')
    }
  }, [ isLoading, invitationLink ])

  const handleClickButton = useCallback(() => {
    dispatch(checkrInvitationFetchingStart())
  }, [ dispatch ])

  return (
    <Box className='custom-box mb-25 background-check' display={ isClosed ? 'none' : 'block' }>
      <div>
        <IconButton size='small' className='pull-right' onClick={ () => setIsClosed(true) }>
          <FontAwesomeIcon icon={ faTimes } />
        </IconButton>
        <h3 className='h3 mb-15'> Background Screening </h3>
        <p className='para text'>
          Companies are more likely to hire applicants that passed a background screening test.
        </p>
      </div>
      <Grid
        container
        justify='space-between'
        spacing={ 2 }
        className='background-check-buttons'
      >
        <Grid item xl={ 4 } lg={ 4 } sm={ 5 } xs={ 12 } className='text-align-last-center'>
          <Button
            onClick={ () => setIsClosed(true) }
            classes={ {
              root: 'button-secondary-small custom-button',
              label: 'button-secondary-small-label',
            } }
          >
            Not Now
          </Button>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } sm={ 5 } xs={ 12 } className='text-align-last-center'>
          <Button
            onClick={ handleClickButton }
            classes={ {
              root: 'button-primary-small custom-button',
              label: 'button-primary-small-label',
            } }
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CheckrVerification
