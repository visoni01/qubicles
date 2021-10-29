/* eslint-disable complexity */
import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, IconButton, Button, form, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import {
  updateCompanyProfileSettingsApiStart, resetUpdateProfileSettingsFlags, agentProfileSettingsApiStart,
  resetAgentProfileSettingsFlags,
} from '../../../../../redux-saga/redux/actions'
import Loader from '../../../../loaders/circularLoader'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const ChangePassword = ({
  open, setOpen, isUpdateLoading, isUpdateSuccess, updatedDataType, userType,
}) => {
  const [ visible, setVisible ] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const dispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      currentPassword: yup.string()
        .required('*Required'),
      newPassword: yup.string()
        .required('*Required'),
      confirmPassword: yup.string()
        .required('*Required')
        .oneOf([ yup.ref('newPassword'), null ], '*Passwords does not match'),
    }),
  })

  const onSubmit = (data) => {
    if (!isUpdateLoading) {
      if (userType === 'client') {
        dispatch(updateCompanyProfileSettingsApiStart({
          updatedDataType: 'password',
          updatedData: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
        }))
      } else if (userType === 'agent') {
        dispatch(agentProfileSettingsApiStart({
          updatedDataType: 'password',
          updatedData: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
          requestType: REQUEST_TYPES.UPDATE,
        }))
      }
    }
  }

  const handleCancelPasswordChange = useCallback(() => {
    setVisible({
      newPassword: false,
      confirmPassword: false,
    })

    setOpen(false)
  }, [ setOpen ])

  useEffect(() => {
    if (!isUpdateLoading && isUpdateSuccess && updatedDataType === 'password') {
      setOpen(false)
      if (userType === 'client') {
        dispatch(resetUpdateProfileSettingsFlags())
      } else if (userType === 'agent') {
        dispatch(resetAgentProfileSettingsFlags())
      }
    }
  }, [ isUpdateSuccess, isUpdateLoading, dispatch, setOpen, updatedDataType, userType ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelPasswordChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <div className='display-inline-flex'>
          <h3 className='h3 mb-30'> Change Password </h3>
          {isUpdateLoading && updatedDataType === 'password' && (
          <Loader
            className='static-small-loader'
            enableOverlay={ false }
            displayLoaderManually
            size={ 23 }
          />
          )}
        </div>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10'>
            <div className='mb-40'>
              <h4 className='h4 mb-5'> Current Password </h4>
              <TextField
                name='currentPassword'
                type={ visible.currentPassword ? 'text' : 'password' }
                autoComplete='off'
                placeholder='Enter your current password'
                className='is-fullwidth'
                inputRef={ register }
                error={ errors.currentPassword }
                helperText={ errors.currentPassword ? errors.currentPassword.message : '' }
                variant='outlined'
                size='small'
                InputProps={ {
                  endAdornment: (
                    <IconButton
                      onClick={ () => setVisible((current) => (
                        { ...current, currentPassword: !current.currentPassword }
                      )) }
                    >
                      <FontAwesomeIcon
                        icon={ visible.currentPassword ? faEye : faEyeSlash }
                        className='ml-10 mr-10 custom-fa-icon light'
                      />
                    </IconButton>
                  ),
                } }
              />
            </div>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> New Password </h4>
              <TextField
                name='newPassword'
                type={ visible.newPassword ? 'text' : 'password' }
                className='is-fullwidth'
                placeholder='Enter your new password'
                autoComplete='off'
                inputRef={ register }
                error={ errors.newPassword }
                helperText={ errors.newPassword ? errors.newPassword.message : '' }
                variant='outlined'
                size='small'
                InputProps={ {
                  endAdornment: (
                    <IconButton
                      onClick={ () => setVisible((current) => (
                        { ...current, newPassword: !current.newPassword }
                      )) }
                    >
                      <FontAwesomeIcon
                        icon={ visible.newPassword ? faEye : faEyeSlash }
                        className='ml-10 mr-10 custom-fa-icon light'
                      />
                    </IconButton>
                  ),
                } }
              />
            </div>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> Confirm Password </h4>
              <TextField
                name='confirmPassword'
                type={ visible.confirmPassword ? 'text' : 'password' }
                className='is-fullwidth'
                placeholder='Repeat your new password'
                inputRef={ register }
                error={ errors.confirmPassword }
                helperText={ errors.confirmPassword ? errors.confirmPassword.message : '' }
                variant='outlined'
                size='small'
                InputProps={ {
                  endAdornment: (
                    <IconButton
                      onClick={ () => setVisible((current) => (
                        { ...current, confirmPassword: !current.confirmPassword }
                      )) }
                    >
                      <FontAwesomeIcon
                        icon={ visible.confirmPassword ? faEye : faEyeSlash }
                        className='ml-10 mr-10 custom-fa-icon light'
                      />
                    </IconButton>
                  ),
                } }
              />
            </div>
            <div className='mt-20 display-inline-flex justify-between is-fullwidth'>
              <Button
                classes={ {
                  root: 'button-secondary-small-red',
                  label: 'button-secondary-small-label',
                } }
                onClick={ handleCancelPasswordChange }
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
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

ChangePassword.defaultProps = {
  open: false,
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updatedDataType: '',
  userType: '',
}

ChangePassword.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  isUpdateLoading: PropTypes.bool,
  isUpdateSuccess: PropTypes.bool,
  updatedDataType: PropTypes.string,
  userType: PropTypes.string,
}

export default ChangePassword
