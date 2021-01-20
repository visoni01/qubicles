import React from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  contactsIcon, holdIcon, transferIcon, volumeIcon, muteIcon, endCallIcon,
} from '../../../assets/images/agentDashboard'

export default function ActiveCallPanel({
  setOpenContactsModal,
}) {
  return (
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
          >
            <div className='text-align-last-center'>
              <img src={ volumeIcon } alt='Chat Icon' />
              <p className='para'> Volume</p>
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
  )
}

ActiveCallPanel.defaultProps = {
  setOpenContactsModal: () => {},

}

ActiveCallPanel.propTypes = {
  setOpenContactsModal: PropTypes.func,
}
