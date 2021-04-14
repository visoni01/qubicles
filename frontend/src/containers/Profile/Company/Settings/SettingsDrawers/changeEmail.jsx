import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, TextField, Grid,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { accountSettingInfoDefaultProps, accountSettingInfoPropTypes } from '../settingsProps'
import {
  updateCompanyProfileSettingsApiStart,
  resetUpdateProfileSettingsFlags,
  agentProfileSettingsApiStart,
  resetAgentProfileSettingsFlags,
} from '../../../../../redux-saga/redux/actions'

const ChangeEmail = ({
  open, setOpen, accountSettingInfo, isUpdateLoading, isUpdateSuccess, updatedDataType, requestType, userType,
}) => {
  const [ newEmail, setNewEmail ] = useState('')
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      newEmail: '',
    },
    validationSchema: yup.object().shape({
      newEmail: yup.string().email('*Please enter a valid email')
        .required('*Required')
        .notOneOf([ accountSettingInfo.email ], '*Must be different from Current Email'),

    }),
  })

  const onSubmit = (data) => {
    if (!isUpdateLoading) {
      if (userType === 'client') {
        dispatch(updateCompanyProfileSettingsApiStart({
          updatedDataType: 'email',
          updatedData: {
            email: data.newEmail,
          },
        }))
      } else if (userType === 'agent') {
        dispatch(agentProfileSettingsApiStart({
          updatedDataType: 'email',
          updatedData: {
            email: data.newEmail,
          },
          requestType: 'UPDATE',
        }))
      }
      setNewEmail(data.newEmail)
    }
  }

  const handleCancelEmailChange = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  const handleResendButton = useCallback(() => {
    if (!isUpdateLoading) {
      if (userType === 'client') {
        dispatch(updateCompanyProfileSettingsApiStart({
          updatedDataType: 'email',
          updatedData: {
            email: newEmail,
          },
        }))
      } else if (userType === 'agent') {
        dispatch(agentProfileSettingsApiStart({
          updatedDataType: 'email',
          updatedData: {
            email: newEmail,
          },
          requestType: 'UPDATE',
        }))
      }
    }
  }, [ dispatch, newEmail, isUpdateLoading, userType ])

  const handleReset = useCallback(() => {
    if (userType === 'client') {
      dispatch(resetUpdateProfileSettingsFlags())
    } else if (userType === 'agent') {
      dispatch(resetAgentProfileSettingsFlags())
    }
  }, [ dispatch, userType ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelEmailChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Email </h3>
        {(!isUpdateSuccess || requestType === 'FETCH') && (
          <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
            <div className='pl-10 pr-10'>
              <div className='mb-20'>
                <h4 className='h4 mb-10'> Current Email </h4>
                <div className='mt-10 mb-10'>
                  <p className='para primary'>
                    {accountSettingInfo.email}
                  </p>
                </div>
              </div>
              <div className='mb-20'>
                <h4 className='h4 mb-5'> New Email </h4>
                <TextField
                  name='newEmail'
                  className='is-fullwidth'
                  autoComplete='off'
                  placeholder='Enter your new email address'
                  inputRef={ register }
                  error={ errors.newEmail }
                  helperText={ errors.newEmail ? errors.newEmail.message : '' }
                  variant='outlined'
                  size='small'
                />
              </div>
              <div className='mt-20 display-inline-flex justify-between is-fullwidth'>
                <Button
                  classes={ {
                    root: 'button-secondary-small-red',
                    label: 'button-secondary-small-label',
                  } }
                  onClick={ handleCancelEmailChange }
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  classes={ {
                    root: 'button-primary-small',
                    label: 'button-primary-small-label',
                  } }
                  disabled={ isUpdateLoading }
                  onClick={ () => setOpen(true) }
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        )}
        {!isUpdateLoading && isUpdateSuccess && updatedDataType === 'email' && (
          <div className='mt-30 mr-20'>
            <p className='para sz-lg bold'>Please verify your new email</p>
            <div className='mt-10 mb-5'>
              <span className='para'>A Verification mail is sent to </span>
              <span className='para primary'>
                {`${ newEmail } .`}
              </span>
            </div>
            <div>
              <span className='para'>
                {'Click on the link given in the mail to change your primary email address to '}
              </span>
              <span className='para bold'>
                {` ${ newEmail } .`}
              </span>
            </div>
            <div className='mt-20 mb-10'>
              <Grid container justify='space-between' spacing={ 3 }>
                <Grid item>
                  <Button
                    classes={ {
                      root: 'button-secondary-small',
                      label: 'button-secondary-small-label',
                    } }
                    onClick={ handleResendButton }
                  >
                    Resend Verification Mail
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    classes={ {
                      root: 'button-secondary-small',
                      label: 'button-secondary-small-label',
                    } }
                    onClick={ handleReset }
                  >
                    Re Enter New Email
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  )
}

ChangeEmail.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updatedDataType: '',
  requestType: '',
  userType: '',
}

ChangeEmail.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
  isUpdateLoading: PropTypes.bool,
  isUpdateSuccess: PropTypes.bool,
  updatedDataType: PropTypes.string,
  requestType: PropTypes.string,
  userType: PropTypes.string,
}

export default ChangeEmail
