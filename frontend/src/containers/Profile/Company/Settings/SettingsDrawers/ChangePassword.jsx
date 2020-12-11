import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, IconButton, Button, form, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export default function ChangePassword({ open, setOpen }) {
  const [ visible, setVisible ] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

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
  }

  const handleCancelPasswordChange = useCallback(() => {
    setVisible({
      newPassword: false,
      confirmPassword: false,
    })

    setOpen(false)
  }, [ setOpen ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelPasswordChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Password </h3>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10 mr-50'>
            <div className='mb-40'>
              <h4 className='h4 mb-5'> Current Password </h4>
              <TextField
                name='currentPassword'
                type={ visible.currentPassword ? 'text' : 'password' }
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
                onClick={ () => setOpen(true) }
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
}

ChangePassword.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
}
