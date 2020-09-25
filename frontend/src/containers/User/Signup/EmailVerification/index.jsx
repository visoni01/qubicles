import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../../components/loaders/circularLoader'
import { emailVerificationStart } from '../../../../redux-saga/redux/emailVerification'
import './style.scss'

const EmailVerification = () => {
  const { token } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emailVerificationStart(token))
    // eslint-disable-next-line
  }, [ dispatch ])
  const {
    error, success, tokenType, isLoading,
  } = useSelector(
    (state) => state.emailVerification,
  )
  if (!isLoading) {
    if (error) {
      return (
        <div className='email-verification-error-msg'>
          Link is expired or invalid!!
        </div>
      )
    }
    return (
      <>
        { success && tokenType === 'forgetPassword' && <Redirect to='/reset-new-password' />}
        { success && tokenType === 'verifyEmail' && <Redirect to='/post-signup' />}
      </>
    )
  }
  return (
    <Loader
      className='loader-custom'
      enableOverlay={ false }
      displayLoaderManually
    />
  )
}

export default EmailVerification
