import React, { useState, useCallback } from 'react'
import {
  Grid, Card, CardContent, IconButton,
} from '@material-ui/core'
import {
  callsTodayIcon, waitTimeIcon, talkTimeIcon, salesIcon, callsInQueueIcon, webphoneIcon,
} from '../../../assets/images/agentDashboard'
import CallDialer from './callDialer'

export default function AgentStats() {
  const [ open, setOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div>
      <Grid container spacing={ 4 } className='agent-stats-cards'>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <Card className='stat-card border-1'>
            <img src={ callsTodayIcon } alt='Chat Icon' className='image' />
            <CardContent>
              <div className='stat-val'>
                <h2 className='h2 text-center primary-val color-green'>
                  154
                </h2>
                <span className='para light secondary-val'> /100</span>
              </div>
              <p className='para text-center'>
                Calls Today
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <Card className='stat-card border-1'>
            <img src={ waitTimeIcon } alt='Chat Icon' className='image' />
            <CardContent>
              <h2 className='h2 text-center stat-val '>
                0.5
              </h2>
              <p className='para text-center'>
                Avg Wait Time (min)
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <Card className='stat-card border-1'>
            <img src={ talkTimeIcon } alt='Chat Icon' className='image' />
            <CardContent>
              <h2 className='h2 text-center stat-val '>
                3.53
              </h2>
              <p className='para text-center'>
                Avg Talk Time (min)
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <Card className='stat-card border-1'>
            <img src={ salesIcon } alt='Chat Icon' className='image' />
            <CardContent>
              <div className='stat-val'>
                <h2 className='h2 text-center primary-val color-yellow'>
                  4
                </h2>
                <span className='para light secondary-val'> /10</span>
              </div>
              <p className='para text-center'>
                Sales Today
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <Card className='stat-card border-1'>
            <img src={ callsInQueueIcon } alt='Chat Icon' className='image' />
            <CardContent>
              <div className='stat-val'>
                <h2 className='h2 text-center primary-val color-red'>
                  11
                </h2>
              </div>
              <p className='para text-center'>
                Calls in Queue
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className='display-inline-flex justify-end is-fullwidth'>
        <IconButton
          onClick={ handleOpen }
        >
          <img src={ webphoneIcon } alt='Webphone' />
        </IconButton>
        {open && (
        <CallDialer
          open={ open }
          setOpen={ setOpen }
          anchorEl={ anchorEl }
          setAnchorEl={ setAnchorEl }
          handleClose={ handleClose }
        />
        )}
      </div>
    </div>
  )
}
