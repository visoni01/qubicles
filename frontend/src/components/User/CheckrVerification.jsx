import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CircularProgress } from '@material-ui/core'
import { checkrInvitationFetchingStart } from '../../redux-saga/redux/actions'
import './style.scss'

const CheckrVerification = () => {
  const { isLoading, invitationLink } = useSelector((state) => state.checkr)
  const dispatch = useDispatch()
  const handleClickButton = useCallback(() => {
    dispatch(checkrInvitationFetchingStart())
  }, [])
  useEffect(() => {
    if (!isLoading && invitationLink) {
      window.open(invitationLink, '_blank')
    }
  }, [ isLoading, invitationLink ])
  return (
    <div className='feed-channels card-background-color'>
      <div className='custom-header'>
        Background Screening Test
      </div>
      <Button
        onClick={ handleClickButton }
        color='primary'
        className='primary-button'
      >
        Start Check
      </Button>
      {isLoading && (
      <CircularProgress className='button-circular-progress' />
      )}
    </div>
  )
}

export default CheckrVerification
