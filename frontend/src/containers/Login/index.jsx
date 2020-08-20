import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faLock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'
import { userLoginStart, clearStore } from '../../redux-saga/redux/login'
import './style.scss'
import config from '../../utils/config'

const schema = yup.object().shape({
  email: yup.string().required('*Required'),
  password: yup.string().required('*Required'),
})

const Login = () => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  })
  const history = useHistory()
  const location = useLocation()
  const isReturnTo = location.search.split('?return_url=')
  const isManualLogin = history.location.state && history.location.state.isEmail
  const [ isSocialLogin, setIsSocialLogin ] = useState(true)
  const dispatch = useDispatch()
  const onSubmit = (data) => dispatch(userLoginStart(data))
  const { success } = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(clearStore())
    if (isManualLogin) {
      setIsSocialLogin(!isManualLogin)
    }
  }, [ isManualLogin, dispatch ])

  const inputField = (
    name,
    id,
    placeholder,
    icon = faPaperPlane,
    type = 'text',
    autocomplete = 'on',
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
        autoComplete={ autocomplete }
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
    window.open(`${ config.NODE_BASE_URL }/auth/${ method }`, '',
      'height=400,top=200,left=400,width=500,scrollbars=no,menubar=no,resizable=yes,toolbar=no,location=no,status=no')
  }

  const SocialLoginButton = (buttonName, type, Icon) => (
    <Button
      variant='contained'
      size='large'
      color='primary'
      className={ `social-login-buttons ${ type }` }
      onClick={ () => handleSocialLogin(type) }
      startIcon={ <Icon className='social-login-icons' /> }
    >
      {buttonName}
    </Button>
  )

  const handleCreateAccountLink = () => (isSocialLogin ? history.push('/signup') : setIsSocialLogin(!isSocialLogin))

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
                src='https://i.imgur.com/Ap2GB30.png'
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
                          {SocialLoginButton('Login with Facebook', 'facebook', FacebookIcon)}
                          {SocialLoginButton('Login with Twitter', 'twitter', TwitterIcon)}
                          {SocialLoginButton('Login with LinkedIn', 'linkedin', LinkedinIcon)}
                          <Button
                            type='button'
                            variant='contained'
                            size='large'
                            color='primary'
                            className='social-login-buttons'
                            onClick={ () => setIsSocialLogin(!isSocialLogin) }
                            startIcon={ <FontAwesomeIcon className='social-login-icons mr-10' icon={ faEnvelope } /> }
                          >
                            Login with Email
                          </Button>
                        </div>
                      )}
                      {!isSocialLogin && (
                        <div className='margin-bottom-30'>
                          <form onSubmit={ handleSubmit(onSubmit) } noValidate>
                            <div className='field pb-10'>
                              {inputField(
                                'email',
                                'loginEmail',
                                'Enter your email address',
                                faPaperPlane,
                                'email',
                                'off',
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
                                type='submit'
                                id='sendVerificationCode'
                                className='button btn-outlined is-bold is-fullwidth rounded raised no-lh'
                              >
                                Login
                              </button>
                            </p>
                          </form>
                        </div>
                      )}
                      <button type='button' className='text-button' onClick={ handleCreateAccountLink }>
                        {isSocialLogin ? 'Don\'t have a social account? Sign up using an email instead'
                          : 'Don\'t have an account? Create one now using your email or social media account'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {success && <Redirect to={ (isReturnTo && isReturnTo[ 1 ]) || '/dashboard' } />}
    </div>
  )
}

export default Login
