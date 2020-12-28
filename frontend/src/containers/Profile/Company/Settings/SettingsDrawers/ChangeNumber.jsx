import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, form, TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { accountSettingInfoDefaultProps, accountSettingInfoPropTypes } from '../settingsProps'
import {
  updateCompanyProfileSettingsStart,
  resetUpdateCompanyProfileSettings,
} from '../../../../../redux-saga/redux/actions'
import { regExpPhone } from '../../../../../utils/common'

export default function ChangeNumber({ open, setOpen, accountSettingInfo }) {
  const { isLoading, success, updatedDataType } = useSelector((state) => state.updateCompanyProfileSettings)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      newNumber: '',
    },
    validationSchema: yup.object().shape({
      newNumber: yup.string().matches(regExpPhone, '*Please enter a valid number'),
    }),
  })

  const onSubmit = (data) => {
    if (!isLoading) {
      dispatch(updateCompanyProfileSettingsStart({
        updatedDataType: 'number',
        updatedData: {
          phoneNumber: data.newNumber,
        },
      }))
    }
  }

  const handleCancelNumberChange = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  useEffect(() => {
    if (!isLoading && success && updatedDataType === 'number') {
      setOpen(false)
      dispatch(resetUpdateCompanyProfileSettings())
    }
  }, [ success, isLoading, dispatch, setOpen, updatedDataType ])

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelNumberChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Number </h3>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10 '>
            <div className='mb-20'>
              <h4 className='h4 mb-10'> Current Number </h4>
              <div className='mt-10 mb-10'>
                <p className='para primary'>
                  {accountSettingInfo.phoneNumber}
                </p>
              </div>
            </div>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> New Number </h4>
              <TextField
                name='newNumber'
                className='is-fullwidth'
                autoComplete='off'
                placeholder='Enter your new number'
                inputRef={ register }
                error={ errors.newNumber }
                helperText={ errors.newNumber ? errors.newNumber.message : '' }
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
                onClick={ handleCancelNumberChange }
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

ChangeNumber.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
}

ChangeNumber.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
}
