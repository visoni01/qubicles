/* eslint-disable complexity */
import React, { useCallback } from 'react'
import {
  Box, Grid, Button, IconButton, Input, Divider, Switch,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import MultiSelectChipItems from '../../../NewPeople/MultiSelectChipItems'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from './settingsProps'

export default function AccountView({
  setOpenDrawer, accountSettingInfo, setAccountSettingInfo,
}) {
  const handleSmsNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => ({
      ...currentSetting,
      smsNotification: !currentSetting.smsNotification,
    }))
  }, [ setAccountSettingInfo ])

  const handleEmailNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => ({
      ...currentSetting,
      emailNotification: !currentSetting.emailNotification,
    }))
  }, [ setAccountSettingInfo ])

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
                <Button
                  classes={ {
                    root: 'button-primary-text',
                    label: 'button-primary-text-label',
                  } }
                >
                  Change Name
                </Button>
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
                <Input
                  defaultValue='****************'
                  className='text-edit'
                />
                <IconButton>
                  <FontAwesomeIcon icon={ faEye } className='custom-fa-icon light' />
                </IconButton>
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
                    {`${ accountSettingInfo.address }` }
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
                >
                  Change Number
                </Button>
              </div>
              <div className='row-fields'>
                <span className='para'>
                  {accountSettingInfo.mobilePhone}
                </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section small-width'>
                <h4 className='h4'>SMS Notifications</h4>
                <Switch
                  className='switches'
                  color='primary'
                  checked={ !!accountSettingInfo.smsNotification }
                  onChange={ handleSmsNotificationSwitch }
                />
              </div>
              <div className='row-section small-width'>
                <h4 className='h4'>Email Notifications</h4>
                <Switch
                  className='switches'
                  color='primary'
                  checked={ !!accountSettingInfo.emailNotification }
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
