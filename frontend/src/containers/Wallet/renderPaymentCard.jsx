import React from 'react'
import PropTypes from 'prop-types'
import { Divider, IconButton, Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversity, faCreditCard, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const RenderPaymentCard = ({ paymentCard }) => (
  <div className='wallet-root'>
    <Grid
      container
      spacing={ 2 }
      justify='space-between'
      alignItems='center'
    >
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 3 }>
        <FontAwesomeIcon
          icon={ paymentCard.paymentCardType === 'Credit Card' ? faCreditCard : faUniversity }
          className='custom-fa-icon sz-lg light'
        />
      </Grid>
      <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 6 }>
        <div className='display-inline-flex direction-column'>
          <p className='para bold heading-color'>{paymentCard.bankName}</p>
          <div className='display-inline-flex'>
            <p className='para'>{paymentCard.paymentCardType}</p>
            <p className='ml-10 para'>{paymentCard.cardDetails}</p>
          </div>
        </div>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 3 }>
        <IconButton
          className='ml-50 mr-10'
        >
          <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-sm light' />
        </IconButton>
      </Grid>
    </Grid>
    <Divider className='divider' />
  </div>
)

RenderPaymentCard.propTypes = {
  paymentCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bankName: PropTypes.string.isRequired,
    paymentCardType: PropTypes.string.isRequired,
    cardDetails: PropTypes.string.isRequired,
  }).isRequired,
}

export default RenderPaymentCard
