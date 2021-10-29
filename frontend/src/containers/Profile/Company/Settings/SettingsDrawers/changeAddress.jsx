import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, Grid, TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from '../settingsProps'
import {
  updateCompanyProfileSettingsApiStart, resetUpdateProfileSettingsFlags, agentProfileSettingsApiStart,
  resetAgentProfileSettingsFlags,
} from '../../../../../redux-saga/redux/actions'
import Loader from '../../../../loaders/circularLoader'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const ChangeAddress = ({
  open, setOpen, accountSettingInfo, isUpdateLoading, isUpdateSuccess, updatedDataType, userType,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isUpdateLoading && isUpdateSuccess && updatedDataType === 'address') {
      setOpen(false)
      if (userType === 'client') {
        dispatch(resetUpdateProfileSettingsFlags())
      } else if (userType === 'agent') {
        dispatch(resetAgentProfileSettingsFlags())
      }
    }
  }, [ isUpdateSuccess, isUpdateLoading, dispatch, setOpen, updatedDataType, userType ])

  const { register, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      street: yup.string()
        .required('*Required'),
      city: yup.string()
        .required('*Required'),
      state: yup.string()
        .required('*Required'),
      zip: yup.string()
        .required('*Required'),
    }),
  })

  const onSubmit = (data) => {
    if (!isUpdateLoading) {
      if (userType === 'client') {
        dispatch(updateCompanyProfileSettingsApiStart({
          updatedDataType: 'address',
          updatedData: {
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
        }))
      } else if (userType === 'agent') {
        dispatch(agentProfileSettingsApiStart({
          updatedDataType: 'address',
          updatedData: {
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
          requestType: REQUEST_TYPES.UPDATE,
        }))
      }
    }
  }

  const handleCancelAddressChange = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelAddressChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <div className='display-inline-flex'>
          <h3 className='h3 mb-30'> Change Address </h3>
          {isUpdateLoading && updatedDataType === 'address' && (
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
            <div className='mb-20'>
              <h4 className='h4 mb-5'> Street </h4>
              <TextField
                name='street'
                defaultValue={ accountSettingInfo.street }
                className='is-fullwidth'
                inputRef={ register }
                autoComplete='off'
                error={ errors.street }
                helperText={ errors.street ? errors.street.message : '' }
                variant='outlined'
                size='small'
              />
            </div>
            <div className='mb-20'>
              <Grid container justify='space-between' alignItems='center' spacing={ 2 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 6 }>
                  <h4 className='h4 mb-5'> Zip Code </h4>
                  <TextField
                    name='zip'
                    className='is-fullwidth'
                    inputRef={ register }
                    autoComplete='off'
                    defaultValue={ accountSettingInfo.zip }
                    error={ errors.zip }
                    helperText={ errors.zip ? errors.zip.message : '' }
                    variant='outlined'
                    size='small'
                  />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 6 }>
                  <h4 className='h4 mb-5'> City </h4>
                  <TextField
                    name='city'
                    className='is-fullwidth'
                    inputRef={ register }
                    autoComplete='off'
                    defaultValue={ accountSettingInfo.city }
                    error={ errors.city }
                    helperText={ errors.city ? errors.city.message : '' }
                    variant='outlined'
                    size='small'
                  />
                </Grid>
              </Grid>
            </div>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> State </h4>
              <TextField
                name='state'
                className='is-fullwidth'
                inputRef={ register }
                autoComplete='off'
                defaultValue={ accountSettingInfo.state }
                error={ errors.state }
                helperText={ errors.state ? errors.state.message : '' }
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
                onClick={ handleCancelAddressChange }
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

ChangeAddress.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updatedDataType: '',
  userType: '',
}

ChangeAddress.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
  isUpdateLoading: PropTypes.bool,
  isUpdateSuccess: PropTypes.bool,
  updatedDataType: PropTypes.string,
  userType: PropTypes.string,
}

export default ChangeAddress
