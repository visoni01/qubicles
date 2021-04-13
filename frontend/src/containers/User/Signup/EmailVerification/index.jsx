import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../../components/loaders/circularLoader'
import { emailVerificationStart } from '../../../../redux-saga/redux/auth/emailVerification'
import './style.scss'
import { showSuccessMessage } from '../../../../redux-saga/redux/actions'
import { PROFILE_ROUTE } from '../../../../routes/routesPath'

const EmailVerification = () => {
  const { userDetails } = useSelector((state) => state.login)
  const { token } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(emailVerificationStart({ token, userType: userDetails && userDetails.user_code }))
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
    if (success && tokenType === 'resetEmail') {
      dispatch(showSuccessMessage({ msg: 'Email Changed Successfully' }))
      return <Redirect to={ PROFILE_ROUTE } />
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
