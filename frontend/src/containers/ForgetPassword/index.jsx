import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'

import { useHistory, Link } from 'react-router-dom'
import {
  forgetPasswordMailStart,
  forgetPasswordMailReset,
} from '../../redux-saga/redux/actions'
import '../User/Signup/SignUp/style.scss'

const schema = yup.object().shape({
  email: yup.string().email().required('*Required'),
})

const ForgetPassword = () => {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: schema,
  })
  const { success } = useSelector((state) => state.forgetPasswordMail)
  const [ email, setEmail ] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => (() => {
    dispatch(forgetPasswordMailReset())
  }), [ dispatch ])

  const onSubmit = (data) => {
    setEmail(data.email)
    dispatch(forgetPasswordMailStart({ email: data.email }))
  }

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
                      <div className='input-heading'>
                        Reset Password
                      </div>
                      <form onSubmit={ handleSubmit(onSubmit) } noValidate>
                        <div className='field pb-10'>
                          {inputField(
                            'email',
                            'signupEmail',
                            'Enter your registered email',
                            faPaperPlane,
                            'email',
                          )}
                        </div>
                        <p className='control login'>
                          <button
                            type='submit'
                            id='forgetPasswordLink'
                            className='button btn-outlined is-bold is-fullwidth rounded raised no-lh'
                          >
                            Send Reset Password Link
                          </button>
                        </p>
                      </form>
                    </>
                  )}
                  <div>
                    {success && (
                    <>
                      <p className='success-send-email'>
                        {'If you have registered with us, you will get a password reset link on your email '}
                        <b>{`${ email }`}</b>
                      </p>
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

export default ForgetPassword
