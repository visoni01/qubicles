import React from 'react'
import {
  Box, Button, Divider, Switch, Grid, Input, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import MultiSelectChipItems from '../../../NewPeople/MultiSelectChipItems'

export default function IntegrationSection() {
  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'> Integrations </h2>
      <div className='integration-section '>

        {/* API Section */}

        <div className='sub-section'>
          <h3 className='h3 mb-20'>API </h3>
          <h4 className='h4 mb-20'>API Token </h4>
          <div className='inline-block'>
            <span className='para mr-30'> JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva </span>
            <Button
              classes={ {
                root: 'button-primary-small',
                label: 'button-primary-small-label',
              } }
            >
              Regenerate Token
            </Button>
          </div>
        </div>

        <Divider className='divider' />

        {/* FTP Section */}
        <div className='sub-section'>
          <h3 className='h3 mb-20'>FTP </h3>
          <p className='para mb-20'> Enter your FTP information in the fields below. We will use this to push data from us to you, such as call recordings, etc. </p>
          <div className='inline-block flex mb-20'>
            <h4 className='h4 mr-30'>Active </h4>
            <Switch className='switches' color='primary' />
          </div>
          <Grid container spacing={ 3 }>
            <Grid container item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } spacing={ 6 }>
              <Grid container item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } direction='column'>
                <h4 className='h4'> FTP Host </h4>
                <MultiSelectChipItems />
              </Grid>
              <Grid container item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } direction='column'>
                <h4 className='h4'> FTP Port </h4>
                <MultiSelectChipItems />
              </Grid>
            </Grid>

            <Grid container item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } spacing={ 6 }>
              <Grid container item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } direction='column'>
                <h4 className='h4'> FTP User </h4>
                <MultiSelectChipItems />
              </Grid>
              <Grid container item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 } direction='column'>
                <div className='display-inline-flex justify-between is-fullwidth'>
                  <h4 className='h4'> Password </h4>
                  <Button
                    classes={ {
                      root: 'button-primary-text',
                      label: 'button-primary-text-label',
                    } }
                  >
                    Change Password
                  </Button>
                </div>
                <div className='display-inline-flex justify-between is-fullwidth padding-10'>
                  <Input
                    defaultValue='****************'
                    className='text-edit'
                  />
                  <IconButton>
                    <FontAwesomeIcon icon={ faEye } className='custom-fa-icon light' />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  )
}
