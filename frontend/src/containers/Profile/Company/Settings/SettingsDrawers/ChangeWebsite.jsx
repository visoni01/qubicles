import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Drawer, Button, TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { accountSettingInfoDefaultProps, accountSettingInfoPropTypes } from '../settingsProps'
import {
  updateCompanyProfileSettingsStart,
  resetUpdateCompanyProfileSettings,
} from '../../../../../redux-saga/redux/actions'

export default function ChangeWebsite({ open, setOpen, accountSettingInfo }) {
  const { isLoading, success } = useSelector((state) => state.updateCompanyProfileSettings)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      newWebsite: '',
    },
    validationSchema: yup.object().shape({
      newWebsite: yup.string()
        .required('*Required'),
    }),
  })

  const onSubmit = (data) => {
    if (!isLoading) {
      dispatch(updateCompanyProfileSettingsStart({
        updatedDataType: 'website',
        updatedData: {
          website: data.newWebsite,
        },
      }))
    }
  }

  const handleCancelWebsiteChange = useCallback(() => {
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
      onClose={ handleCancelWebsiteChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <h3 className='h3 mb-30'> Change Website </h3>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10 mr-50'>
            <div className='mb-20'>
              <h4 className='h4 mb-10'> Current Website </h4>
              <div className='mt-10 mb-10'>
                <a
                  target='_blank'
                  href={ accountSettingInfo.website }
                  className='primary-text-link'
                  rel='noopener noreferrer'
                >
                  {accountSettingInfo.website}
                </a>
              </div>
            </div>
            <div className='mb-20'>
              <h4 className='h4 mb-5'> New Website </h4>
              <TextField
                name='newWebsite'
                className='is-fullwidth'
                placeholder='Enter your new website'
                inputRef={ register }
                error={ errors.newWebsite }
                helperText={ errors.newWebsite ? errors.newWebsite.message : '' }
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
                onClick={ handleCancelWebsiteChange }
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

ChangeWebsite.defaultProps = {
  open: false,
  accountSettingInfo: accountSettingInfoDefaultProps,
}

ChangeWebsite.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
}
