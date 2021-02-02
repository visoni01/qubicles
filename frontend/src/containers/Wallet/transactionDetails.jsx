/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TableContainer, TableBody, TableRow, TableCell,
} from '@material-ui/core'
import TransactionReceiptModal from './transactionReceipt'

const TransactionDetails = ({
  transaction,
}) => {
  const [ openTransactionReceiptModal, setOpenTransactionReceiptModal ] = useState(false)
  return (
    <>
      <div className='wallet-details no-margin pb-10'>
        <TableContainer>
          <TableBody>
            <TableRow key={ transaction.transactionId }>
              <TableCell>
                <p className='para bold'>
                  {transaction.date}
                </p>
              </TableCell>
              <TableCell>
                <p className='para bold'>
                  {transaction.course}
                </p>
              </TableCell>
              <TableCell>
                <p
                  className='para text-link shorten-transaction-id'
                  onClick={ () => setOpenTransactionReceiptModal(true) }
                >
                  {transaction.transactionId}
                </p>
              </TableCell>
              <TableCell className='transaction-price  text-center'>
                <span className={ `para ${ transaction.transactionType === 'credit' ? 'price-green' : 'price-red' }` }>
                  {transaction.QBEtoken}
                </span>
              </TableCell>
              <TableCell className='transaction-price text-center'>
                <span className='para light'>
                  {transaction.price}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
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
