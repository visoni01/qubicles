import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { emailVerificationStart } from '../../../../redux-saga/redux/emailVerification'
import { CircularLoader } from '../../../../components/loaders'
import './style.scss'

const EmailVerification = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch( emailVerificationStart( token ) )
  }, [] )
  const { error, isLoading, success } = useSelector(
    ( state ) => state.emailVerification,
  )
  return (
    <>
      <CircularLoader isLoading={ isLoading } optionalStyle="clip-loader-css" />
      {success && <> You are email has been verified </>}
      {error && <> An unexpected error occured </>}
    </>
  )
}

export default EmailVerification
