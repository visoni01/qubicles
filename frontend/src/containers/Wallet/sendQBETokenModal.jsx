import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Button,
  IconButton,
  InputBase,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const SendQBEToken = ({
  open, onClose, onSubmit,
}) => {
  const [ sendQBETokenData, setSendQBETokenData ] = useState({
    recipientAddress: '',
    amount: '',
    memo: '',
  })

  const setSendQBETokenDataCB = useCallback((event) => {
    const { name, value } = event.target
    setSendQBETokenData((currentQBETokenData) => ({
      ...currentQBETokenData,
      [ name ]: value,
    }))
  }, [ ])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ onClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal wallet-root'

    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Send</h2>
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
        <div className='display-inline-flex direction-column is-fullwidth'>
          <h4 className='h4 light text-center'> Max Spendable Amount </h4>
          <h3 className='h3 bold text-center'> 2,631 QBE </h3>
        </div>
        <h4 className='h4 mt-30'>Recipient Address</h4>
        <InputBase
          placeholder='example.qbe'
          className='search-input mt-10'
        />
        <h4 className='h4 mt-30'>Amount</h4>
        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <InputBase
            placeholder='QBE'
            className='search-input mt-10'
          />
          <FontAwesomeIcon className='custom-fa-icon light ml-10 mr-10 mt-5' icon={ faExchangeAlt } />
          <InputBase
            placeholder='USD'
            className='search-input mt-10'
          />
        </div>
        <h4 className='h4 mt-30'>Memo</h4>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          rows={ 7 }
          multiline
          variant='outlined'
          placeholder='Max 256 characters'
          value={ sendQBETokenData.amount }
          onChange={ setSendQBETokenDataCB }
          required
          name='memo'
          className='mt-10'
        />
      </DialogContent>
      <DialogActions className='modal-actions'>
        <div className='sendQBEModal-buttons is-fullwidth'>
          <Button
            disabled
            className='wide-button'
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ onSubmit }
          >
            Send
          </Button>
          <Button
            color='secondary'
            onClick={ onClose }
            className='cancel-button'
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

SendQBEToken.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SendQBEToken
