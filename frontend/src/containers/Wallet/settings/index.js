import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tabs, Tab,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import WalletSettings from './walletSettings'
import QubiclesDebitCardSettings from './qubiclesDebitCardSettings'

const Settings = ({ open, onClose }) => {
  const [ activeTab, setActiveTab ] = useState(0)

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ onClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal wallet-root'
      classes={ { paper: 'wallet-modals' } }
    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'> Wallet Settings </h2>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ onClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className='custom-active-tabs wallet-active-tabs'>
          <Tabs
            value={ activeTab }
            onChange={ (_, tab) => setActiveTab(tab) }
          >
            <Tab label='Wallet' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
            <Tab label='Qubicles Debit Card' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
          </Tabs>
        </div>
        {activeTab === 0 && <WalletSettings onClose={ onClose } />}
        {activeTab === 1 && <QubiclesDebitCardSettings onClose={ onClose } />}
      </DialogContent>
    </Dialog>
  )
}

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Settings
