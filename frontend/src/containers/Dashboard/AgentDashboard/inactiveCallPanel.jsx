import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  dialPadIcon, dialNextIcon, contactsIcon, callLogsIcon, callbacksBlueIcon,
} from '../../../assets/images/agentDashboard'
import ManualDialModal from './manualDial'

const InactiveCallPanel = ({
  setOpenContactsModal, setOpenCallbackModal, setOpenCallLogsModal,
}) => {
  const [ openManualDialModal, setOpenManualDialModal ] = useState(false)
  return (
    <>
      <Grid item container justify='flex-start' spacing={ 3 } lg={ 9 }>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large dial-buttons',
              label: 'button-secondary-large-label dial-buttons-label',
            } }
            startIcon={
              <img src={ dialPadIcon } alt='Chat Icon' />
        }
            onClick={ () => setOpenManualDialModal(true) }
          >
            Manual Dial
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large dial-buttons',
              label: 'button-secondary-large-label dial-buttons-label',
            } }
            startIcon={
              <img src={ dialNextIcon } alt='Chat Icon' />
        }
          >
            Dial Next
          </Button>
        </Grid>
        <Grid item>
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
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large dial-buttons',
              label: 'button-secondary-large-label dial-buttons-label',
            } }
            startIcon={
              <img src={ callLogsIcon } alt='Chat Icon' />
        }
            onClick={ () => setOpenCallLogsModal(true) }
          >
            Call Logs
          </Button>
        </Grid>
        <Grid item>
          <Button
            classes={ {
              root: 'button-secondary-large dial-buttons',
              label: 'button-secondary-large-label dial-buttons-label',
            } }
            startIcon={
              <img src={ callbacksBlueIcon } alt='Chat Icon' />
        }
            onClick={ () => setOpenCallbackModal(true) }
          >
            Callbacks
          </Button>
        </Grid>
      </Grid>
      <ManualDialModal
        open={ openManualDialModal }
        onClose={ () => setOpenManualDialModal(false) }
        onSubmit={ () => setOpenManualDialModal(false) }
      />
    </>
  )
}

InactiveCallPanel.defaultProps = {
  setOpenContactsModal: () => {},
  setOpenCallbackModal: () => {},
  setOpenCallLogsModal: () => {},
}

InactiveCallPanel.propTypes = {
  setOpenContactsModal: PropTypes.func,
  setOpenCallbackModal: PropTypes.func,
  setOpenCallLogsModal: PropTypes.func,
}

export default InactiveCallPanel
