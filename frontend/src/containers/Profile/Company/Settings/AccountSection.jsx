/* eslint-disable complexity */
import React, { useState, useCallback, useEffect } from 'react'
import {
  Box, Grid, Button, IconButton, Input, Divider, Switch,
} from '@material-ui/core'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import MultiSelectChipItems from '../../../NewPeople/MultiSelectChipItems'

export default function AccountSection() {
  const { settings, isLoading } = useSelector((state) => state.companyProfileSettings)
  const [ accountSettingInfo, setAccountSettingInfo ] = useState(settings)

  useEffect(() => {
    setAccountSettingInfo(settings)
  }, [ settings ])

  const handleSmsNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => ({
      ...currentSetting,
      smsNotification: !currentSetting.smsNotification,
    }))
  }, [])

  const handleEmailNotificationSwitch = useCallback(() => {
    setAccountSettingInfo((currentSetting) => ({
      ...currentSetting,
      emailNotification: !currentSetting.emailNotification,
    }))
  }, [])

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
                {!isLoading && (
                <span className='para'>
                  {accountSettingInfo.companyId}
                </span>
                )}
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
                {!isLoading && (
                <span className='para'>
                  {accountSettingInfo.companyName}
                </span>
                )}
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
                >
                  Change Password
                </Button>
              </div>
              <div className='row-fields flex'>
                {!isLoading && (
                <Input
                  defaultValue='****************'
                  className='text-edit'
                />
                )}
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
                >
                  Change Address
                </Button>
              </div>
              <div className='row-fields'>
                {!isLoading && (
                <span className='para'>
                  <p>
                    {`${ accountSettingInfo.address }` }
                  </p>
                  <p>
                    {`${ accountSettingInfo.city } ${ accountSettingInfo.zip }, ${ accountSettingInfo.state } ` }
                  </p>
                </span>
                )}
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
                {!isLoading && (
                <span className='para'>
                  {accountSettingInfo.email}
                </span>
                )}
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
                {!isLoading && (
                <span className='para '>
                  {accountSettingInfo.homePhone}
                </span>
                )}
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
                {!isLoading && (
                <span className='para'>
                  {accountSettingInfo.mobilePhone}
                </span>
                )}
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section small-width'>
                <h4 className='h4'>SMS Notifications</h4>
                {!isLoading && (
                <Switch
                  className='switches'
                  color='primary'
                  checked={ accountSettingInfo.smsNotification }
                  onChange={ handleSmsNotificationSwitch }
                />
                )}
              </div>
              <div className='row-section small-width'>
                <h4 className='h4'>Email Notifications</h4>
                {!isLoading && (
                <Switch
                  className='switches'
                  color='primary'
                  checked={ accountSettingInfo.emailNotification }
                  onChange={ handleEmailNotificationSwitch }
                />
                )}
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
                {!isLoading && (
                <span className='para'>
                  {accountSettingInfo.website}
                </span>
                )}
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Timezone</h4>
              </div>
              <div className='row-fields no-padding-left'>
                {!isLoading && (
                <MultiSelectChipItems />
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  )
}
