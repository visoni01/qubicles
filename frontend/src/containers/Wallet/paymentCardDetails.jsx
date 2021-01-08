import React from 'react'
import { Box, Button } from '@material-ui/core'
import { paymentCardData } from './testData'
import RenderPaymentCard from './renderPaymentCard'

const PaymentCardDetails = () => (
  <div>
    <Box className='custom-box'>
      <h3 className=' h3 mb-30'> Bank Accounts and Credit Cards </h3>
      {paymentCardData.map((paymentCard) => (
        <RenderPaymentCard
          key={ paymentCard.id }
          paymentCard={ paymentCard }
        />
      ))}
      <div className='text-center mb-10'>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
        >
          Add bank account or credit card
        </Button>
      </div>
    </Box>
  </div>
)

export default PaymentCardDetails
