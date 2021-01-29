import React, { useState, useCallback } from 'react'
import {
  Grid, Button, IconButton, Slider, Popover,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  contactsIcon, holdIcon, transferIcon, volumeIcon, muteIcon, endCallIcon,
} from '../../../assets/images/agentDashboard'
import XferModal from './xfer'

const ActiveCallPanel = ({
  setOpenContactsModal,
}) => {
  const [ openXferModal, setOpenXferModal ] = useState(false)
  const [ volumeLevel, setVolumeLevel ] = useState(30)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openVolumeSlider, setOpenVolumeSlider ] = useState(false)

  const handleVolumeSliderOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
    setOpenVolumeSlider(true)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setOpenVolumeSlider(false)
  }, [])

  const handleSliderChange = useCallback((event, newValue) => {
    setVolumeLevel(newValue)
  }, [])

  return (
    <>
      <Grid item container justify='flex-start' spacing={ 3 } lg={ 9 } alignItems='center'>
        <Grid item lg={ 4 } md={ 3 } sm={ 4 } xs={ 12 }>
          <Button
            classes={ {
              root: 'button-secondary-large dial-buttons',
              label: 'button-secondary-large-label dial-buttons-label',
            } }
            startIcon={
              <img src={ contactsIcon } alt='Chat Icon' />
        }
            onClick={ () => setOpenContactsModal(true) }
          >
            Contacts
          </Button>
        </Grid>
        <Grid
          item
          container
          justify='space-between'
          lg={ 5 }
          md={ 6 }
          sm={ 8 }
          xs={ 12 }
          classes={ { item: 'no-padding pl-20 pr-20' } }
          alignItems='flex-end'
        >
          <Grid item>
            <IconButton
              classes={ { root: 'no-padding-bottom' } }
            >
              <div className='text-align-last-center'>
                <img src={ holdIcon } alt='Chat Icon' />
                <p className='para'> Hold</p>
              </div>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              classes={ { root: 'no-padding-bottom' } }
              onClick={ () => setOpenXferModal(true) }
            >
              <div className='text-align-last-center'>
                <img src={ transferIcon } alt='Chat Icon' />
                <p className='para'> X-Fer</p>
              </div>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              classes={ { root: 'no-padding-bottom' } }
              onClick={ handleVolumeSliderOpen }
            >
              <div className='text-align-last-center'>
                <img src={ volumeIcon } alt='Chat Icon' />
                <p className='para' id='volume-slider'>Volume</p>
              </div>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              classes={ { root: 'no-padding-bottom' } }
            >
              <div className='text-align-last-center'>
                <img src={ muteIcon } alt='Chat Icon' />
                <p className='para'> Mute</p>
              </div>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              classes={ { root: 'no-padding-bottom' } }
            >
              <div className='text-align-last-center'>
                <img src={ endCallIcon } alt='Chat Icon' />
                <p className='para'> End Call</p>
              </div>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <XferModal
        open={ openXferModal }
        onClose={ () => setOpenXferModal(false) }
        onSubmit={ () => setOpenXferModal(false) }
      />
      <Popover
        open={ openVolumeSlider }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 2 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        } }
        classes={ {
          paper: 'mt-10 call-volume-popover',
        } }
      >
        <Slider
          orientation='vertical'
          value={ volumeLevel }
          onChange={ handleSliderChange }
          classes={ {
            vertical: 'call-volume-slider',
            thumb: 'volume-slider-thumb',
          } }
        />
      </Popover>
    </>
  )
}

ActiveCallPanel.defaultProps = {
  setOpenContactsModal: () => {},

}

ActiveCallPanel.propTypes = {
  setOpenContactsModal: PropTypes.func,
}

export default ActiveCallPanel
