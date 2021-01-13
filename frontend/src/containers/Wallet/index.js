import React from 'react'
import { Grid } from '@material-ui/core'
import WalletDetails from './walletDetails'
import PaymentCardDetails from './paymentCardDetails'
import Invoices from './invoices'
import './styles.scss'
import Referral from './referral'

const Wallet = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 12 } xs={ 12 }>
      <WalletDetails />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 } xs={ 12 }>
      <PaymentCardDetails />
      <Referral />
      <Invoices />
    </Grid>
  </Grid>
)

export default Wallet
