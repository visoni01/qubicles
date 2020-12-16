import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { accountSettingInfoDefaultProps, accountSettingInfoPropTypes } from '../settingsProps'
import {
  updateCompanyProfileSettingsStart,
  resetUpdateCompanyProfileSettings,
} from '../../../../../redux-saga/redux/actions'

export default function ChangeEmail({ open, setOpen, accountSettingInfo }) {
  const {
    isLoading, success,
  } = useSelector((state) => state.updateCompanyProfileSettings)

  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      newEmail: '',
    },
    validationSchema: yup.object().shape({
      newEmail: yup.string()
        .required('*Required'),
    }),
  })

  const onSubmit = (data) => {
    if (!isLoading) {
      dispatch(updateCompanyProfileSettingsStart({
        updatedDataType: 'email',
        updatedData: {
          email: data.newEmail,
        },
      }))
    }
  }

  const handleCancelEmailChange = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  useEffect(() => {
    if (!isLoading && success) {
      setOpen(false)
      dispatch(resetUpdateCompanyProfileSettings())
    }
  }, [ success, isLoading, dispatch, setOpen ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelEmailChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Email </h3>
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
                onClick={ () => setOpen(true) }
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

ChangeEmail.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
}

ChangeEmail.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
}
