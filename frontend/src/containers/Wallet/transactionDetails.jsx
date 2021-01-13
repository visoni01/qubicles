import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TransactionReceiptModal from './transactionReceipt'

const TransactionDetails = ({
  transaction,
}) => {
  const [ openTransactionReceiptModal, setOpenTransactionReceiptModal ] = useState(false)
  return (
    <>
      <div className='wallet-details pb-10'>
        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <p className='para bold'>
            {transaction.date}
          </p>
          <p className='para bold'>
            {transaction.course}
          </p>
          <p className='para text-link shorten-transaction-id'>
            {transaction.transactionId}
          </p>
          <div className='display-inline-flex'>
            <p className={ `para ${ transaction.transactionType === 'credit' ? 'price-green' : 'price-red' }` }>
              {transaction.QBEtoken}
            </p>
            <p className='para light ml-20'>
              {transaction.price}
            </p>
          </div>
        </div>
      </div>
      <TransactionReceiptModal
        open={ openTransactionReceiptModal }
        onClose={ setOpenTransactionReceiptModal }
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
