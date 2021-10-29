import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUniversity, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import AddBankAccountModal from './addBankAccount'
import AddCreditCard from './addCreditCard'

const AddPaymentMethod = ({ open, onClose }) => {
  const [ openAddBankAccountModal, setOpenAddBankAccountModal ] = useState(false)
  const [ openCreditCardModal, setOpenCreditCardModal ] = useState(false)

  const handleOpenAddBankAccountModal = () => {
    setOpenAddBankAccountModal(true)
    onClose()
  }

  const handleOpenCreditCardModal = () => {
    setOpenCreditCardModal(true)
    onClose()
  }

  return (
    <>
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
            <h2 className='h2'> Add Payment Method </h2>
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
          <div className='text-center mb-30'>
            <Button
              className='payment-method-button'
              classes={ {
                root: 'button-secondary-large',
                label: 'button-secondary-large-label',
              } }
              startIcon={ <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faUniversity } /> }
              onClick={ handleOpenAddBankAccountModal }
            >
              Add Bank Account
            </Button>
          </div>
          <div className='text-center mb-30'>
            <Button
              className='payment-method-button'
              classes={ {
                root: 'button-secondary-large',
                label: 'button-secondary-large-label',
              } }
              startIcon={ <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faCreditCard } /> }
              onClick={ handleOpenCreditCardModal }
            >
              Add Credit Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {openAddBankAccountModal && (
        <AddBankAccountModal
          open={ openAddBankAccountModal }
          onClose={ () => setOpenAddBankAccountModal(false) }
          onSubmit={ () => setOpenAddBankAccountModal(false) }
        />
      )}

      {openCreditCardModal && (
      <AddCreditCard
        open={ openCreditCardModal }
        onClose={ () => setOpenCreditCardModal(false) }
        onSubmit={ () => setOpenCreditCardModal(false) }
      />
      )}
    </>
  )
}

AddPaymentMethod.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddPaymentMethod
