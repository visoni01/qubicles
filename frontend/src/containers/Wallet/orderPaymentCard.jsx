import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import VirtualCardModal from './virtualCard'
import OrderPhysicalCard from './orderPhysicalCard'

const OrderPaymentCard = ({ open, onClose }) => {
  const [ openVirtualCardModal, setOpenVirtualCardModal ] = useState(false)
  const [ openOrderPhysicalCard, setOpenOrderPhysicalCard ] = useState(false)

  const handleOpenVirtualCardModal = () => {
    setOpenVirtualCardModal(true)
    onClose()
  }

  const handleOpenOrderPhysicalCard = () => {
    setOpenOrderPhysicalCard(true)
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
            <h2 className='h2'> Choose Card Type </h2>
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
              onClick={ handleOpenVirtualCardModal }
            >
              <div className='display-inline-flex align-items-center direction-column'>
                <p className='para bold primary'> Virtual Card </p>
                <span className='para bold heading-color'> $ 0.10 </span>
                <span className='para light'> One Time Payment </span>
              </div>
            </Button>
          </div>
          <div className='text-center mb-30'>
            <Button
              className='payment-method-button'
              classes={ {
                root: 'button-secondary-large',
                label: 'button-secondary-large-label',
              } }
              onClick={ handleOpenOrderPhysicalCard }
            >
              <div className='display-inline-flex align-items-center direction-column'>
                <p className='para bold primary'> Physical Card </p>
                <span className='para bold heading-color'> $ 3.00 </span>
                <span className='para light'> One Time Payment </span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {openVirtualCardModal && (
        <VirtualCardModal
          open={ openVirtualCardModal }
          onClose={ () => setOpenVirtualCardModal(false) }
          onSubmit={ () => setOpenVirtualCardModal(false) }
        />
      )}
      {openOrderPhysicalCard && (
        <OrderPhysicalCard
          open={ openOrderPhysicalCard }
          onClose={ () => setOpenOrderPhysicalCard(false) }
          onSubmit={ () => setOpenOrderPhysicalCard(false) }
        />
      )}
    </>
  )
}

OrderPaymentCard.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default OrderPaymentCard
