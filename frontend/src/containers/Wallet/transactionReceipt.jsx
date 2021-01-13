import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, IconButton, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TransactionReceipt = ({
  open, onClose, transaction,
}) => (
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
        <h2 className='h2'>Transaction Details</h2>
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
      <div className='wallet-details'>
        <h4 className='h4 mt-30 shorten-transaction-id '>Transaction Id</h4>
        <div className='mt-10'>
          <p className='para mt-20'>
            {transaction.transactionId}
          </p>
        </div>
        <Grid container spacing={ 2 }>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <div className='mr-20'>
              <h4 className='h4 mt-30'>Sender</h4>
              <div className='mt-10'>
                <p className='para mt-20'>
                  {transaction.sender}
                </p>
              </div>
            </div>
            <div className='mr-20'>
              <h4 className='h4 mt-30'>Date/Time</h4>
              <div className='mt-10'>
                <p className='para mt-20'>
                  {transaction.date}
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <div>
              <h4 className='h4 mt-30'>Recipient</h4>
              <div className='mt-10'>
                <p className='para mt-20'>
                  {transaction.recipient}
                </p>
              </div>
            </div>
            <div className='mr-20'>
              <h4 className='h4 mt-30'>Amount</h4>
              <div className='display-inline-flex align-items-center '>
                <p className='para mt-20'>
                  {transaction.price}
                  <span className='para light'>
                    {' '}
                    (
                    {transaction.QBEtoken}
                    )
                  </span>
                </p>
              </div>
            </div>
          </Grid>
        </Grid>

        <h4 className='h4 mt-30'>Description</h4>
        <div className='mt-10'>
          <p className='para mt-20'>
            {transaction.course}
          </p>
        </div>
        <h4 className='h4 mt-30'>Memo</h4>
        <div className='mt-10 memo-box'>
          <p className='para memo-description'>
            {transaction.memo}
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

TransactionReceipt.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    QBEtoken: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
    transactionType: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
  }).isRequired,
}

export default TransactionReceipt
