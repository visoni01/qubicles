import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'

const TransactionDetails = ({
  transaction,
}) => (
  <div className='wallet-details'>
    <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
      <p className='para bold'>
        {transaction.date}
      </p>
      <p className='para bold'>
        {transaction.course}
      </p>
      <p className='para text-link'>
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
    <Divider className='divider' />
  </div>
)

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
