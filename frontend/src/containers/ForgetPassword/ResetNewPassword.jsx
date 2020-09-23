import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLock,
} from '@fortawesome/free-solid-svg-icons'

import { useHistory, Link } from 'react-router-dom'
import {
  resetPasswordStart,
  resetPasswordSuccessful,
} from '../../redux-saga/redux/actions'
import '../User/Signup/SignUp/style.scss'

const schema = yup.object().shape({
  password: yup.string().required('*Required'),
  confirmPassword: yup.string().required('*Required').oneOf([ yup.ref('password'), null ], 'Passwords must match'),
})

const ResetNewPassword = () => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  })
  const { email } = useSelector((state) => state.emailVerification)
  const { success } = useSelector((state) => state.resetPassword)
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      dispatch(resetPasswordStart({ email, pass: data.password }))
      console.log('This is pass', data, email)
    }
    // setEmail(data.email)
  }

  const inputField = (
    name,
    id,
    placeholder,
    icon = faLock,
    type = 'password',
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
          <div className='hero-heading hero-heading-custom'>
            <div className='section has-text-centered section-signup'>
              <Link to='/'>
                <img
                  className='top-logo'
                  src='https://i.imgur.com/Ap2GB30.png'
                  alt='Qubicles logo'
                />
              </Link>
            </div>
          </div>
          <div className='hero-body hero-body-custom'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-8 is-offset-2'>
                  {!success && (
                    <>
                      <>
                        <form onSubmit={ handleSubmit(onSubmit) } noValidate>
                          <div className='field pb-10'>
                            {inputField(
                              'password',
                              'password',
                              'New password',
                              faLock,
                              'password',
                            )}
                            {inputField(
                              'confirmPassword',
                              'confirmPassword',
                              'Confirm password',
                              faLock,
                              'password',
                            )}
                          </div>
                          <p className='control login'>
                            <button
                              type='submit'
                              id='resetPassword'
                              className='button btn-outlined is-bold is-fullwidth rounded raised no-lh'
                            >
                              Submit
                            </button>
                          </p>
                        </form>
                      </>
                    </>
                  )}
                  <div>
                    {success && (
                    <>
                      <button type='button' className='text-button mt-20' onClick={ () => history.push('/login') }>
                        <span className='options-span-2'>
                          Back to Login
                        </span>
                      </button>
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

export default ResetNewPassword
