import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Button, form } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import { useDispatch } from 'react-redux'
import { accountSettingInfoDefaultProps, accountSettingInfoPropTypes } from '../settingsProps'
import {
  updateCompanyProfileSettingsApiStart, resetUpdateProfileSettingsFlags, agentProfileSettingsApiStart,
  resetAgentProfileSettingsFlags,
} from '../../../../../redux-saga/redux/actions'
import { phoneNumberFormatter } from '../../../../../utils/common'
import Loader from '../../../../loaders/circularLoader'
import { REQUEST_TYPES, USERS } from '../../../../../utils/constants'
import '../../../../User/Signup/PostSignUp/style.scss'
import '../styles.scss'

const ChangeNumber = ({
  open, setOpen, accountSettingInfo, isUpdateLoading, isUpdateSuccess, updatedDataType, userType, phoneType,
}) => {
  const [ formState, setFormState ] = useState({
    isValid: false,
    newNumber: false,
  })

  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      newNumber: '',
    },
  })

  useEffect(() => {
    if (!isUpdateLoading && isUpdateSuccess
      && (updatedDataType === 'number' || updatedDataType === 'mobile phone' || updatedDataType === 'home phone')) {
      setOpen(false)
      if (userType === 'client') {
        dispatch(resetUpdateProfileSettingsFlags())
      } else if (userType === USERS.AGENT) {
        dispatch(resetAgentProfileSettingsFlags())
      }
    }
  }, [ isUpdateSuccess, isUpdateLoading, dispatch, setOpen, updatedDataType, userType ])

  const onSubmit = () => {
    if (!isUpdateLoading && formState.isValid) {
      if (userType === 'client') {
        dispatch(updateCompanyProfileSettingsApiStart({
          updatedDataType: 'number',
          updatedData: {
            phoneNumber: formState.newNumber && formState.newNumber.slice(1),
          },
        }))
      } else if (userType === USERS.AGENT) {
        if (phoneType === 'numberDrawer') {
          dispatch(agentProfileSettingsApiStart({
            updatedDataType: 'mobile phone',
            updatedData: {
              mobileNumber: formState.newNumber && formState.newNumber.slice(1),
            },
            requestType: REQUEST_TYPES.UPDATE,
          }))
        } else if (phoneType === 'phoneDrawer') {
          dispatch(agentProfileSettingsApiStart({
            updatedDataType: 'home phone',
            updatedData: {
              homePhone: formState.newNumber && formState.newNumber.slice(1),
            },
            requestType: REQUEST_TYPES.UPDATE,
          }))
        }
      }
    }
  }

  const handleCancelNumberChange = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  const handlePhoneNumberChange = ({ args }) => {
    const [ isValid, value, selectedCountryData, fullNumber ] = args
    const nextValue = isValid
      ? fullNumber.replace(/([()])|-/g, '')
      : phoneNumberFormatter(value, selectedCountryData)

    if (isValid) {
      setFormState({ isValid: true, newNumber: nextValue })
    } else {
      setFormState({ ...formState, isValid: false })
    }
    return nextValue
  }

  return (
    <Drawer
      anchor='right'
      open={ open }
      onClose={ handleCancelNumberChange }
      classes={ { paper: 'settings-drawer' } }
    >
      <div>
        <div className='display-inline-flex'>
          <h3 className='h3 mb-30'> Change Number </h3>
          {isUpdateLoading
          && (updatedDataType === 'number' || updatedDataType === 'mobile phone' || updatedDataType === 'home phone')
          && (
            <Loader
              className='static-small-loader'
              enableOverlay={ false }
              displayLoaderManually
              size={ 23 }
            />
          )}
        </div>
        <form className='is-fullwidth' onSubmit={ handleSubmit(onSubmit) }>
          <div className='pl-10 pr-10 '>
            <div className='mb-20'>
              <h4 className='h4 mb-10'> Current Number </h4>
              <div className='mt-10 mb-10'>
                <p className='para primary'>
                  {/*eslint-disable*/
                  (userType === 'client')
                    ? accountSettingInfo.phoneNumber : ((phoneType === 'phoneDrawer')
                    ? accountSettingInfo.homePhone : accountSettingInfo.mobileNumber)
                  /*eslint-disable*/
                  }
                </p>
              </div>
            </div>
            <div className='drawer-controller'>
              <h4 className='h4'> New Number </h4>
              <Controller
                as={ IntlTelInput }
                control={ control }
                fieldId='field-controller'
                preferredCountries={ [ 'us', 'ca' ] }
                containerClassName=' custom-intl-tel-input intl-tel-input'
                format
                formatOnInit
                name='newNumber'
                onChangeName='onPhoneNumberChange'
                onChange={ (args) => handlePhoneNumberChange({ args, name }) }
                telInputProps={ {
                  required: true,
                } }
                defaultValue=''
                placeholder='Enter your new number'
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
                disabled={ isUpdateLoading || !formState.isValid }
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
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updatedDataType: '',
  userType: '',
  phoneType: '',
}

ChangeNumber.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
  isUpdateLoading: PropTypes.bool,
  isUpdateSuccess: PropTypes.bool,
  updatedDataType: PropTypes.string,
  userType: PropTypes.string,
  phoneType: PropTypes.string,
}

export default ChangeNumber
