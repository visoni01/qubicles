import React from 'react'
import {
  Box, Grid, Switch, Divider, Button, TextField,
} from '@material-ui/core'

const Teams = () => (
  <Box className='custom-box'>
    <h2 className='h2 mb-30'>Teams</h2>
    <div className='settings-section'>
      <p className='para mb-10'>
        Justin Barnett is assigned to following teams
      </p>
      <Grid container spacing={ 0 } direction='column'>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
            <h4 className='h4 margin-auto ml-0'>Customer Service</h4>
            <Switch
              className='switches setting-switch'
              color='primary'
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
            <h4 className='h4 margin-auto ml-0'>Spanish Representatives</h4>
            <Switch
              className='switches setting-switch'
              color='primary'
            />
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
            <h4 className='h4 margin-auto ml-0'>Outbound</h4>
            <Switch
              className='switches setting-switch'
              color='primary'
            />
          </Grid>
        </Grid>

        <Divider className='divider' />

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Add Team </h4>
            <div className='display-inline-flex is-fullwidth'>
              <TextField
                margin='dense'
                variant='outlined'
                name='team'
                defaultValue='Team Name'
                className='drop-down-bar is-width-70-per'
              />
              <div className='add-team-button ml-15'>
                <Button
                  classes={ {
                    root: 'button-primary-large',
                    label: 'button-primary-large-label',
                  } }
                  disabled
                >
                  Add
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </Box>
)

export default Teams
