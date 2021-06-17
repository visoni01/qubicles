/* eslint-disable complexity */
import React, { useCallback, useEffect } from 'react'
import {
  Box, Grid, Button, Divider, Switch, FormControlLabel, Radio, RadioGroup,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import '../../Company/Settings/styles.scss'
import { useDispatch } from 'react-redux'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from './settingsProps'
import Loader from '../../../loaders/circularLoader'
import { agentProfileSettingsApiStart, resetAgentProfileSettingsFlags } from '../../../../redux-saga/redux/actions'

const Accounts = ({
  setOpenDrawer, accountSettingInfo, isUpdateLoading, isUpdateSuccess, updatedDataType,
}) => {
  const dispatch = useDispatch()

  const handleActiveSwitch = useCallback((e) => {
    dispatch(agentProfileSettingsApiStart({
      updatedDataType: 'active',
      updatedData: {
        active: e.target.checked,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch ])

  const handleSmsNotificationSwitch = useCallback((e) => {
    dispatch(agentProfileSettingsApiStart({
      updatedDataType: 'Sms Notification',
      updatedData: {
        smsNotification: e.target.checked,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch ])

  const handleEmailNotificationSwitch = useCallback((e) => {
    dispatch(agentProfileSettingsApiStart({
      updatedDataType: 'Email Notification',
      updatedData: {
        emailNotification: e.target.checked,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch ])

  const handleGenderRadio = useCallback((e) => {
    dispatch(agentProfileSettingsApiStart({
      updatedDataType: 'gender',
      updatedData: {
        gender: e.target.value,
      },
      requestType: 'UPDATE',
    }))
  }, [ dispatch ])

  useEffect(() => {
    if (!isUpdateLoading && isUpdateSuccess
      && (updatedDataType === 'Sms Notification'
      || updatedDataType === 'Email Notification'
      || updatedDataType === 'active')) {
      dispatch(resetAgentProfileSettingsFlags())
    }
  }, [ isUpdateSuccess, isUpdateLoading, dispatch, updatedDataType ])

  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'>Account</h2>
      <div className='settings-section'>
        <h3 className='h3'> Basic Information</h3>
        <Grid container spacing={ 3 } direction='column'>

          {/* User Name and Full Name */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4 row-section'> User Name </h4>
              <div className='row-fields mt-5'>
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.userName }`}
                  </p>
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4 row-section'> Full Name </h4>
              <div className='row-fields mt-5'>
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.fullName }`}
                  </p>
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Password and Address */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Password</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, passwordDrawer: true })) }
                >
                  Change Password
                </Button>
              </div>
              <div className='row-fields flex'>
                <span className='para'>
                  **************
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Address</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, addressDrawer: true })) }
                >
                  Change Address
                </Button>
              </div>
              <div className='row-fields'>
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.street }`}
                  </p>
                  <p>
                    {`${ accountSettingInfo.city } ${ accountSettingInfo.zip }, ${ accountSettingInfo.state } `}
                  </p>
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Date Of Birth and SSN */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4 row-section'> Date Of Birth </h4>
              <div className='row-fields mt-5'>
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.dob }`}
                  </p>
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4 row-section'> Social Security Number </h4>
              <div className='row-fields mt-5'>
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.ssn }`}
                  </p>
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Gender and Active */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='display-inline-flex'>
                <h4 className='h4 mb-15'> Gender </h4>
                {isUpdateLoading && updatedDataType === 'gender' && (
                <Loader
                  className='static-small-loader'
                  enableOverlay={ false }
                  displayLoaderManually
                  size={ 23 }
                />
                )}
              </div>
              <RadioGroup
                className='radio-buttons'
                defaultValue={ accountSettingInfo.gender }
                onChange={ handleGenderRadio }
              >
                <div className='display-inline-flex'>
                  <FormControlLabel
                    value='male'
                    control={ <Radio /> }
                    label='Male'
                  />
                  <FormControlLabel
                    value='female'
                    control={ <Radio /> }
                    label='Female'
                  />
                  <FormControlLabel
                    value='other'
                    control={ <Radio /> }
                    label='Other'
                  />
                </div>
              </RadioGroup>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
              <h4 className='h4 margin-auto ml-0'> Active </h4>
              <div className='display-inline-flex align-items-center justify-end'>
                {isUpdateLoading && updatedDataType === 'active' && (
                  <Loader
                    className='static-small-loader'
                    enableOverlay={ false }
                    displayLoaderManually
                    size={ 23 }
                  />
                )}
                <Switch
                  className='switches setting-switch'
                  color='primary'
                  checked={ accountSettingInfo.active }
                  onChange={ handleActiveSwitch }
                />
              </div>
            </Grid>
          </Grid>

          <Divider className='divider' />

          {/* Email and Home Phone */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Email</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, emailDrawer: true })) }
                >
                  Change Email
                </Button>
              </div>
              <div className='row-fields'>
                <span className='para'>
                  {accountSettingInfo.email}
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Home Phone</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, phoneDrawer: true })) }
                >
                  Change Number
                </Button>
              </div>
              <div className='row-fields '>
                <span className='para '>
                  {accountSettingInfo.homePhone}
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Mobile phone and notifications */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Mobile Phone</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, numberDrawer: true })) }
                >
                  Change Number
                </Button>
              </div>
              <div className='row-fields '>
                <span className='para '>
                  {accountSettingInfo.mobileNumber}
                </span>
              </div>
            </Grid>
            <Grid item container xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } justify='flex-start'>
              <Grid item xl={ 12 } lg={ 12 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
                <h4 className='h4 margin-auto ml-0'>SMS Notifications</h4>
                <div className='display-inline-flex align-items-end justify-end'>
                  {isUpdateLoading && updatedDataType === 'Sms Notification' && (
                    <Loader
                      className='static-small-loader'
                      enableOverlay={ false }
                      displayLoaderManually
                      size={ 23 }
                    />
                  )}
                  <Switch
                    className='switches setting-switch'
                    color='primary'
                    checked={ accountSettingInfo.smsNotification }
                    onChange={ handleSmsNotificationSwitch }
                  />
                </div>
              </Grid>
              <Grid item xl={ 12 } lg={ 12 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
                <h4 className='h4 margin-auto ml-0'>Email Notifications</h4>
                <div className='display-inline-flex align-items-end justify-end'>
                  {isUpdateLoading && updatedDataType === 'Email Notification' && (
                    <Loader
                      className='static-small-loader'
                      enableOverlay={ false }
                      displayLoaderManually
                      size={ 23 }
                    />
                  )}
                  <Switch
                    className='switches setting-switch'
                    color='primary'
                    checked={ accountSettingInfo.emailNotification }
                    onChange={ handleEmailNotificationSwitch }
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

Accounts.propTypes = {
  setOpenDrawer: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
  isUpdateLoading: PropTypes.bool,
  isUpdateSuccess: PropTypes.bool,
  updatedDataType: PropTypes.string,
}

Accounts.defaultProps = {
  accountSettingInfo: accountSettingInfoDefaultProps,
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updatedDataType: '',
}

export default Accounts
