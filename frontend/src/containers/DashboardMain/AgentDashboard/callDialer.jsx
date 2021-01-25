import React, { useState, useCallback } from 'react'
import {
  IconButton, Popover, DialogTitle, DialogActions, TextField, Grid, Button, Avatar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { webphoneIcon, dialPadIcon, outboundCallIcon } from '../../../assets/images/agentDashboard'
import { carolin } from '../../../assets/images/avatar'

const CallDialer = () => {
  const [ open, setOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openManualDial, setOpenManualDial ] = useState(false)

  const toggleOpenManualDial = useCallback(() => {
    setOpenManualDial((current) => !current)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setOpen(false)
  }, [])

  const handleOpen = useCallback((e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }, [])

  return (
    <div>
      <IconButton
        onClick={ handleOpen }
      >
        <img src={ webphoneIcon } alt='Webphone' />
      </IconButton>
      <Popover
        disableScrollLock
        open={ open }
        className='custom-modal'
        onClose={ handleClose }
        anchorEl={ anchorEl }
        classes={ { paper: 'call-dialer-popover' } }
      >
        <div className='header'>
          <DialogTitle>
            <h3 className='h3'>My Web Phone</h3>
          </DialogTitle>
          <DialogActions className='cross-button'>
            <IconButton
              className='is-size-6'
              onClick={ handleClose }
            >
              <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
            </IconButton>
          </DialogActions>
        </div>
        <div className='padding-10 no-padding-top'>
          <div className='display-inline-flex is-fullwidth align-items-center pr-10'>
            <IconButton
              onClick={ toggleOpenManualDial }
            >
              <img src={ dialPadIcon } alt='Dialpad' />
            </IconButton>
            <span className='para light sz-lg'>
              or
            </span>
            <div className='ml-10'>
              <TextField
                className='text-field-para'
                placeholder='Enter a number...'
                variant='outlined'
                margin='dense'
              />
            </div>
          </div>
          {openManualDial
            ? (
              <div className='manual-dial padding-20'>
                <Grid
                  container
                  spacing={ 2 }
                  justify='space-evenly'
                >
                  {[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#' ].map((val) => (
                    <Grid item key={ val } lg={ 4 } md={ 4 } sm={ 4 } xs={ 4 } className='text-align-last-center'>
                      <Button
                        classes={ {
                          root: 'button-secondary-small dial-button',
                          label: 'button-secondary-small-label dial-button-label',
                        } }
                      >
                        {val}
                      </Button>
                    </Grid>
                  ))}
                  <Grid itemlg={ 4 } md={ 4 } sm={ 4 } xs={ 4 } className='text-align-last-center'>
                    <IconButton>
                      <img src={ webphoneIcon } alt='Dialpad' />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div className='call-history pl-10'>
                <div className='display-inline-flex justify-between align-items-center is-fullwidth '>
                  <h4 className='h4'>Call History</h4>
                  <IconButton>
                    <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon' />
                  </IconButton>
                </div>
                <div className='history-list'>
                  {[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ].map((val) => (
                    <div key={ val } className='list-divider no-margin pb-10 pt-10'>
                      <div className='display-inline-flex align-items-center'>
                        <img src={ outboundCallIcon } alt='Outbound' className='mr-20' />
                        <div className='display-inline-flex align-items-center'>
                          <Avatar className='profile-pic no-margin' alt='Carolin' src={ carolin } />
                          <div className='ml-10'>
                            <h4 className='h4 sz-sm'>
                              Marilyn Pearson
                            </h4>
                            <p className='para light sz-sm mt-5'>
                              11:31 AM, 26 Oct, 2020
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </Popover>
    </div>
  )
}

export default CallDialer
