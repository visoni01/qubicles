import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { userLoginStart } from '../../redux-saga/redux/login'
import QubiclesLogo from '../../assets/images/qbe-dark.png'
import './style.scss'
import config from '../../utils/config'

const schema = yup.object().shape({
  email: yup.string().required('*Required'),
  password: yup.string().required('*Required'),
})

const Login = ({ history }) => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  })
  const isManualLogin = history.location.state && history.location.state.isEmail
  const [ isSocialLogin, setIsSocialLogin ] = useState(true)
  const dispatch = useDispatch()
  const onSubmit = (data) => dispatch(userLoginStart(data))
  const { error, isLoading, success } = useSelector((state) => state.login)

  useEffect(() => {
    if (isManualLogin) {
      setIsSocialLogin(!isManualLogin)
    }
  }, [ isManualLogin ])

  const inputField = (
    name,
    id,
    placeholder,
    icon = faPaperPlane,
    type = 'text',
  ) => (
    <div
      className={ classNames('control has-icons-right required', 'input-fields') }
    >
      <input
        className='input'
        type={ type }
        id={ id }
        name={ name }
        ref={ register }
        placeholder={ placeholder }
        size='medium'
      />
      <span className='icon is-medium is-right'>
        <FontAwesomeIcon icon={ icon } />
      </span>
      {errors && errors[ name ] && (
        <div className='error-message'>
          {errors[ name ].message}
        </div>
      )}
    </div>
  )

  const handleSocialLogin = (method) => {
    window.open(`${ config.NODE_BASE_URL }/auth/${ method }`)
  }

  const SocialLoginButton = (buttonName, type) => (
    <Button
      variant='contained'
      size='large'
      color='primary'
      className={ `social-login-buttons ${ type }` }
      onClick={ () => handleSocialLogin(type) }
    >
      {buttonName}
    </Button>
  )

  return (
    <div className='login-wrapper columns is-gapless'>
      <div className='column login-column is-8 is-hidden-mobile hero-banner'>
        <div
          className={ classNames(
            'hero login-hero is-fullheight has-background-image',
            'side-cover',
          ) }
        >
          <div className='columns has-text-centered'>
            <div className='column' />
          </div>
        </div>
      </div>
      <div className='column is-4'>
        <div className='hero is-fullheight'>
          <div className='hero-heading'>
            <div className='section has-text-centered section-login'>
              <img
                className='top-logo'
                src={ QubiclesLogo }
                alt='Qubicles logo'
              />
            </div>
          </div>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-8 is-offset-2'>
                  {(!success) && (
                    <>
                      {isSocialLogin && (
                      <div className='margin-bottom-30'>
                        {SocialLoginButton('Log in with Facebook', 'facebook')}
                        {SocialLoginButton('Log in with Twitter', 'twitter')}
                        {SocialLoginButton('Log in with LinkedIn', 'linkedin')}
                      </div>
                      )}
                      {!isSocialLogin && (
                      <div className='margin-bottom-30'>
                        <div className='field pb-10'>
                          {inputField(
                            'email',
                            'loginEmail',
                            'Enter your email address',
                            faPaperPlane,
                            'email',
                          )}
                          {inputField(
                            'password',
                            'password',
                            'Enter your password',
                            faLock,
                            'password',
                          )}
                        </div>
                        <p className='control login'>
                          <button
                            type='button'
                            onClick={ handleSubmit(onSubmit) }
                            id='sendVerificationCode'
                            className='button btn-outlined is-bold is-fullwidth rounded raised no-lh'
                          >
                            Log in
                          </button>
                        </p>
                      </div>
                      )}
                      <button
                        type='button'
                        className='text-button'
                        onClick={ () => setIsSocialLogin(!isSocialLogin) }
                      >
                        {isSocialLogin && (
                        <span>
                          Log in with Email
                        </span>
                        )}
                        {!isSocialLogin && (
                        <span>
                          Back to social log in options
                        </span>
                        )}
                      </button>
                      <br />
                      <button type='button' className='text-button' onClick={ () => history.push('/signup') }>
                        Signup with Email
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {success && <Redirect to='/dashboard' />}
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.instanceOf({
    location: PropTypes.instanceOf({
      state: PropTypes.instanceOf({}),
    }),
  }),
}

Login.defaultProps = {
  history: {
    location: {
      state: { isEmail: false },
    },
  },
}

export default Login
