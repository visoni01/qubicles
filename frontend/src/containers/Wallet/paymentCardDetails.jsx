import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { paymentCardData } from './testData'
import RenderPaymentCard from './renderPaymentCard'
import AddPaymentMethod from './addPaymentMethod'

const PaymentCardDetails = () => {
  const [ openAddPaymentMethodModal, setOpenAddPaymentMethodModal ] = useState(false)
  return (
    <>
      <div>
        <Box className='custom-box'>
          <h3 className=' h3 mb-30'> Bank Accounts and Credit Cards </h3>
          {paymentCardData.map((paymentCard) => (
            <RenderPaymentCard
              key={ paymentCard.id }
              paymentCard={ paymentCard }
            />
          ))}
          <div className='text-center'>
            <Button
              classes={ {
                root: 'button-primary-text',
                label: 'button-primary-text-label',
              } }
              onClick={ () => setOpenAddPaymentMethodModal(true) }
            >
              Add bank account or credit card
            </Button>
          </div>
        </Box>
      </div>
      <AddPaymentMethod
        open={ openAddPaymentMethodModal }
        onClose={ () => setOpenAddPaymentMethodModal(false) }
      />
    </>
  )
}

export default PaymentCardDetails
