import React from 'react'
import {
  Box, Grid, Button, IconButton, Input, Divider, Switch,
} from '@material-ui/core'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default function AccountSection() {
  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'>Account</h2>
      <div className='basic-info'>
        <h3 className='h3 mb-20'> Basic Information</h3>
        <Grid container spacing={ 3 } direction='column'>

          {/* Id and Name */}

          <Grid item container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Company ID</h4>
              </div>
              <div className='row-fields'>
                <span className='para'> fenero </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <span className='para'> Qubicles </span>
              </div>
            </Grid>
          </Grid>

          {/* Password and Address */}

          <Grid item container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <Input
                  defaultValue='****************'
                  className='text-edit'
                />
                <IconButton>
                  <FontAwesomeIcon icon={ faEye } className='custom-fa-icon light' />
                </IconButton>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
              <div className='row-fields small-width'>
                <span className='para '> 4416  Sunrise Road , Mount Charleston</span>
              </div>
            </Grid>
          </Grid>

          <Divider className='divider' />
          {/* Email and phone */}

          <Grid item container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <span className='para'> fenero@qubicles.io </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <span className='para '> 9768456672</span>
              </div>
            </Grid>
          </Grid>

          {/* Mobile phone and notifications */}
          <Grid item container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <span className='para'> 7289882838 </span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>SMS Notifications</h4>
                <Switch />
              </div>
              <div className='row-section'>
                <h4 className='h4'>Email Notifications</h4>
                <Switch />
              </div>
            </Grid>
          </Grid>

          {/* Website and Timezone  */}

          <Grid item container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
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
                <span className='para'> www.qubicles.io</span>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'>Timezone</h4>
              </div>
              <div className='row-fields' />
            </Grid>
          </Grid>

        </Grid>
      </div>
    </Box>
  )
}
