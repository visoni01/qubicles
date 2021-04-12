/* eslint-disable complexity */
import React from 'react'
import {
  Box, Grid, Button, Divider, Switch, TextField, FormControlLabel, Radio, RadioGroup,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { accountSettingInfoPropTypes, accountSettingInfoDefaultProps } from './settingsProps'
import Loader from '../../../../components/loaders/circularLoader'

const Accounts = ({
  accountSettingInfo,
}) => {
  const { isUpdateLoading, updatedDataType } = useSelector((state) => state.clientDetails)

  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'>Account</h2>
      <div className='settings-section'>
        <h3 className='h3 mb-10'> Basic Information</h3>
        <Grid container spacing={ 3 } direction='column'>

          {/* Id and Name */}

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4'> User Name </h4>
              <TextField
                margin='dense'
                variant='outlined'
                name='billing'
                value='terrygarret31'
                className='drop-down-bar'
              />
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4'> Full Name </h4>
              <TextField
                margin='dense'
                variant='outlined'
                name='billing'
                value='Terry Garret'
                className='drop-down-bar'
              />
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

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4'> Date Of Birth </h4>
              <TextField
                margin='dense'
                variant='outlined'
                name='billing'
                value='31/05/1986'
                className='drop-down-bar'
              />
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4'> Social Security Number </h4>
              <TextField
                margin='dense'
                variant='outlined'
                name='billing'
                value='123456789'
                className='drop-down-bar'
              />
            </Grid>
          </Grid>

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <h4 className='h4'> Gender </h4>
              <RadioGroup
                className='radio-buttons mt-10'
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
              <Switch
                className='switches margin-auto setting-switch'
                color='primary'
              />
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
              <div className='row-fields '>
                <span className='para '>
                  {accountSettingInfo.mobilePhone}
                </span>
              </div>
            </Grid>
            <Grid item container xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } justify='flex-start'>
              <Grid item xl={ 12 } lg={ 12 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
                <h4 className='h4 margin-auto ml-0'>SMS Notifications</h4>
                <div className='align-items-end justify-end'>
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
  accountSettingInfo: accountSettingInfoPropTypes,
}

Accounts.defaultProps = {
  accountSettingInfo: accountSettingInfoDefaultProps,
}

export default Accounts
