import React from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, Grid, TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from '../settingsProps'

export default function ChangeAddress({ open, setOpen, accountSettingInfo }) {
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
    console.log('data===', data)
  }

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ () => setOpen(false) }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Address </h3>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10 mr-20'>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> Street </h4>
              <TextField
                name='street'
                defaultValue={ accountSettingInfo.address }
                className='is-fullwidth'
                inputRef={ register }
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
                onClick={ () => setOpen(false) }
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

ChangeAddress.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
}

ChangeAddress.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
}
