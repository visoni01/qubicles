/* eslint-disable complexity */
import React, { useCallback } from 'react'
import {
  Box, Grid, Button, Divider, Switch,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'
import { useDispatch } from 'react-redux'
import MultiSelectChipItems from '../../../NewPeople/MultiSelectChipItems'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from './settingsProps'
import { updateCompanyProfileSettingsStart } from '../../../../redux-saga/redux/actions'

export default function AccountView({
  setOpenDrawer, accountSettingInfo, setAccountSettingInfo,
}) {
  const dispatch = useDispatch()
  const handleSmsNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => {
      dispatch(updateCompanyProfileSettingsStart({
        updatedDataType: 'Sms Notification',
        updatedData: {
          smsNotification: !currentSetting.smsNotification,
        },
      }))

      return ({
        ...currentSetting,
        smsNotification: !currentSetting.smsNotification,
      })
    })
  }, [ setAccountSettingInfo, dispatch ])

  const handleEmailNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => {
      dispatch(updateCompanyProfileSettingsStart({
        updatedDataType: 'Email Notification',
        updatedData: {
          emailNotification: !currentSetting.emailNotification,
        },
      }))

      return ({
        ...currentSetting,
        emailNotification: !currentSetting.emailNotification,
      })
    })
  }, [ setAccountSettingInfo, dispatch ])

  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'>Account</h2>
      <div className='settings-section'>
        <h3 className='h3 mb-10'> Basic Information</h3>
        <Grid container spacing={ 3 } direction='column'>

          {/* Id and Name */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Company ID</h4>
              </div>
              <div className='row-fields'>
                <span className='para'>
                  {accountSettingInfo.companyId}
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Company Name</h4>
              </div>
              <div className='row-fields'>
                <span className='para'>
                  {accountSettingInfo.companyName}
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
                    {`${ accountSettingInfo.street }` }
                  </p>
                  <p>
                    {`${ accountSettingInfo.city } ${ accountSettingInfo.zip }, ${ accountSettingInfo.state } ` }
                  </p>
                </span>
              </div>
            </Grid>
          </Grid>

          <Divider className='divider' />
          {/* Email and phone */}

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
                <h4 className='h4'>Business Phone</h4>
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
                  {accountSettingInfo.phoneNumber}
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Mobile phone and notifications */}
          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section small-width'>
                <h4 className='h4'>SMS Notifications</h4>
                <Switch
                  className='switches'
                  color='primary'
                  checked={ accountSettingInfo.smsNotification }
                  onChange={ handleSmsNotificationSwitch }
                />
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section small-width'>
                <h4 className='h4'>Email Notifications</h4>
                <Switch
                  className='switches'
                  color='primary'
                  checked={ accountSettingInfo.emailNotification }
                  onChange={ handleEmailNotificationSwitch }
                />
              </div>
            </Grid>
          </Grid>

          {/* Website and Timezone  */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Website</h4>
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                  onClick={ () => setOpenDrawer((current) => ({ ...current, websiteDrawer: true })) }
                >
                  Change Website
                </Button>
              </div>
              <div className='row-fields '>
                <span className='para'>
                  {accountSettingInfo.website}
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Timezone</h4>
              </div>
              <div className='row-fields no-padding-left'>
                <MultiSelectChipItems />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}

AccountView.propTypes = {
  setOpenDrawer: PropTypes.func.isRequired,
  accountSettingInfo: accountSettingInfoPropTypes,
  setAccountSettingInfo: PropTypes.func.isRequired,
}

AccountView.defaultProps = {
  accountSettingInfo: accountSettingInfoDefaultProps,
}
