import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faUser,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

import { userSignupStart } from '../../../../redux-saga/redux/signup'
import QubiclesLogo from '../../../../assets/images/qbe-dark.png'
import './style.scss'

const schema = yup.object().shape({
  first_name: yup.string().required('*Required'),
  last_name: yup.string().required('*Required'),
  email: yup.string().email().required('*Required'),
  pass: yup.string().required('*Required'),
})

const SignUp = ({ location, history }) => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  })
  const [ isSocialSignup, setIsSocialSignup ] = useState(true)
  const isSocialSignupSuccess = location.search && location.search.split('?')[ 1 ] === 'with_social=true' // Temporary set up.
  const dispatch = useDispatch()
  const onSubmit = (data) => dispatch(userSignupStart(data))
  const { error, isLoading, success } = useSelector((state) => state.signup)

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

  return (
    <div className='login-wrapper columns is-gapless'>
      <div className='column login-column is-8 is-hidden-mobile hero-banner'>
        <div
          className={ classNames(
            'hero login-hero is-fullheight has-background-image height-full-cover',
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
            <div className='section has-text-centered section-signup'>
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
                  {(!success && !isSocialSignupSuccess) && (
                    <>
                      <>
                        <button
                          type='button'
                          className='text-button mb-20'
                          onClick={ () => history.push({
                            pathname: '/login',
                            state: { isEmail: true },
                          }) }
                        >
                          Already have an account? Click here to login
                        </button>
                        <div className='field pb-10'>
                          {inputField(
                            'email',
                            'signupEmail',
                            'Enter your email address',
                            faPaperPlane,
                            'email',
                          )}
                          {inputField(
                            'first_name',
                            'firstName',
                            'Enter your first name',
                            faUser,
                          )}
                          {inputField(
                            'last_name',
                            'lastName',
                            'Enter your last name',
                            faUser,
                          )}
                          {inputField(
                            'pass',
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
                            Sign Up
                          </button>
                        </p>
                      </>
                      <button type='button' className='text-button mt-20' onClick={ () => history.push('/login') }>
                        <span className='options-span-2'>
                          Or sign up faster using your Facebook, Twitter or linkedIn account
                        </span>
                      </button>
                    </>
                  )}
                  <div>
                    {(success || isSocialSignupSuccess) && (
                      <>
                        {'You have succesfully registered. Please check your inbox'}
                        {'to verify your email !!'}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SignUp.propTypes = {
  location: PropTypes.instanceOf({
    search: PropTypes.string,
  }),
  history: PropTypes.instanceOf({
    push: PropTypes.func,
  }).isRequired,
}

SignUp.defaultProps = {
  location: {
    search: '',
  },
}

export default SignUp
