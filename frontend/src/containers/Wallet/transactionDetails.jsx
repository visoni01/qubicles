/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import TransactionReceiptModal from './transactionReceipt'

const TransactionDetails = ({
  transaction,
}) => {
  const [ openTransactionReceiptModal, setOpenTransactionReceiptModal ] = useState(false)
  return (
    <>
      <div className='wallet-details pb-10'>
        <Grid container spacing={ 1 } justify='space-between' alignItems='flex-start'>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
            <p className='para bold'>
              {transaction.date}
            </p>
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 12 }>
            <p className='para bold'>
              {transaction.course}
            </p>
          </Grid>
          <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 12 }>
            <p
              className='para text-link shorten-transaction-id'
              onClick={ () => setOpenTransactionReceiptModal(true) }
            >
              {transaction.transactionId}
            </p>
          </Grid>
          <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 } className='transaction-price'>
            <p className={ `para ${ transaction.transactionType === 'credit' ? 'price-green' : 'price-red' }` }>
              {transaction.QBEtoken}
            </p>
          </Grid>
          <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 } className='transaction-price'>
            <p className='para light'>
              {transaction.price}
            </p>
          </Grid>
        </Grid>
      </div>
      <TransactionReceiptModal
        open={ openTransactionReceiptModal }
        onClose={ () => setOpenTransactionReceiptModal(false) }
        transaction={ transaction }
      />
    </>
  )
}

TransactionDetails.propTypes = {
  transaction: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    QBEtoken: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    transactionType: PropTypes.string.isRequired,
  }).isRequired,
}

export default TransactionDetails
