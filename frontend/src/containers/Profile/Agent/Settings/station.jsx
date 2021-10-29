import React from 'react'
import {
  Box, Grid, TextField, Switch, Divider, Select, Button,
} from '@material-ui/core'
import { agentsData } from '../../../Dashboard/testData'

const station = () => (
  <Box className='custom-box'>
    <div className='skills-endorsements-box'>
      <h2 className='h2 mb-30'> Station </h2>
      <Button
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Reset Station
      </Button>
    </div>
    <div className='settings-section'>
      <h3 className='h3 mb-10'> General </h3>
      <Grid container spacing={ 3 } direction='column'>
        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Station Extension </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Description </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Caller ID </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
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

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid container item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } direction='column'>
            <h4 className='h4'> Registration Service </h4>
            <Select
              margin='dense'
              variant='outlined'
              native
              label='Choose service'
              className='setting-select'
            >
              <option aria-label='None' value='' />
              {agentsData.map((agent) => (
                <option key={ agent.id } value={ agent.agentName }>
                  { agent.agentName}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid container item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } direction='column'>
            <h4 className='h4'> Station Type </h4>
            <Select
              margin='dense'
              variant='outlined'
              native
              label='Choose type'
              className='setting-select'
            >
              <option aria-label='None' value='' />
              {agentsData.map((agent) => (
                <option key={ agent.id } value={ agent.agentName }>
                  { agent.agentName}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Registration Password </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Custom Dialplan# </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 0 }>
          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
              <h4 className='h4 margin-auto ml-0'> Use WebRTC Phone </h4>
              <Switch
                className='switches setting-switch'
                color='primary'
              />
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
              <h4 className='h4 margin-auto ml-0'> Use Auto Minimize </h4>
              <Switch
                className='switches setting-switch'
                color='primary'
              />
            </Grid>
          </Grid>

          <Grid item container justify='space-between' spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
              <h4 className='h4 margin-auto ml-0'> Use Auto Connect </h4>
              <Switch
                className='switches setting-switch'
                color='primary'
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider className='divider' />

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Voicemail ID </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Voicemail PIN </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Voicemail Timezone </h4>
            <Select
              margin='dense'
              variant='outlined'
              native
              label='Choose service'
              className='setting-select'
            >
              <option aria-label='None' value='' />
              {agentsData.map((agent) => (
                <option key={ agent.id } value={ agent.agentName }>
                  { agent.agentName}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'> Email </h4>
            <TextField
              margin='dense'
              variant='outlined'
              name='billing'
              defaultValue=''
              className='drop-down-bar'
            />
          </Grid>
        </Grid>

        <Grid item container justify='space-between' spacing={ 6 }>
          <Grid container item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 } spacing={ 6 }>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'> New Messages </h4>
              </div>
              <div className='row-fields'>
                <p className='para mt-15'>
                  {0}
                </p>
              </div>
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } sm={ 12 } xs={ 12 }>
              <div className='row-section'>
                <h4 className='h4'> Old Messages </h4>
              </div>
              <div className='row-fields'>
                <p className='para mt-15'> 0</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </Box>
)

export default station
