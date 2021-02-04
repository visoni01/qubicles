import React, { useState } from 'react'
import {
  Box, Button, Grid, InputBase, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons'
import creditCard from '../../assets/images/creditcard.svg'
import TransactionDetails from './transactionDetails'
import { transactionDetails } from './testData'
import SendQBETokenModal from './sendQBETokenModal'
import AddToSavingsModal from './addToSavings'
import RemoveFromSavingsModal from './removeFromSavings'
import AddFundsModal from './addFunds'
import WithdrawFundsModal from './withdrawFunds'
import WalletSettingsModal from './settings/index'
import OrderPaymentCardModal from './orderPaymentCard'

const WalletDetails = () => {
  const [ openSendQBEModal, setOpenSendQBE ] = useState(false)
  const [ openAddToSavingsModal, setOpenAddToSavingsModal ] = useState(false)
  const [ openRemoveFromSavingsModal, setOpenRemoveFromSavingsModal ] = useState(false)
  const [ openAddFundsModal, setOpenAddFundsModal ] = useState(false)
  const [ openWithdrawFundsModal, setOpenWithdrawFundsModal ] = useState(false)
  const [ openWalletSettingsModal, setOpenWalletSettingsModal ] = useState(false)
  const [ openOrderPaymentCardModal, setOpenOrderPaymentCardModal ] = useState(false)

  return (
    <>
      <Box className='custom-box wallet-root'>
        <div className='wallet-header'>
          <div className='display-inline-flex'>
            <h2 className='h2'> Wallet </h2>
            <h2 className='h2 light ml-20 wallet-address'> jamesdec.qbe </h2>
          </div>
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ () => setOpenWalletSettingsModal(true) }
          >
            Wallet Settings
          </Button>
        </div>
        <div>
          <div className='mt-50 wallet-details'>
            <Grid container spacing={ 3 }>
              <Grid item xl={ 5 } lg={ 5 } md={ 12 } sm={ 12 } xs={ 12 }>
                {/* Card Pic */}
                <img src={ creditCard } alt='creditCard' className='credit-card-pic h4' />
              </Grid>
              <Grid item xl={ 7 } lg={ 7 } md={ 12 } sm={ 12 } xs={ 12 }>
                <div>
                  <p className='para light'> Total </p>
                  <div className='display-inline-flex'>
                    <h2 className='h2'> 13,080 </h2>
                    <h2 className='h2 unbold ml-5'> QBE </h2>
                  </div>
                  <div>
                    <h3 className='h3 light'> $13,080 USD </h3>
                  </div>
                </div>
                <div className='mt-20'>
                  <Grid container spacing={ 4 } alignItems='flex-end'>
                    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 }>
                      <p className='para light'> Available </p>
                      <h3 className='h3'> 2,631 QBE </h3>
                      <h3 className='h3 light'> $2,631 USD </h3>
                      <div className='mt-15'>
                        <Grid container spacing={ 3 } justify='space-between'>
                          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                            <Button
                              classes={ {
                                root: 'button-primary-small',
                                label: 'button-primary-small-label',
                              } }
                              className='is-fullwidth'
                              onClick={ () => setOpenAddFundsModal(true) }
                            >
                              Add Funds
                            </Button>
                          </Grid>
                          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                            <Button
                              classes={ {
                                root: 'button-primary-small',
                                label: 'button-primary-small-label',
                              } }
                              className='is-fullwidth'
                              onClick={ () => setOpenSendQBE(true) }
                            >
                              Send
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                      <div className='mt-15'>
                        <Button
                          className='wide-button'
                          classes={ {
                            root: 'button-secondary-small',
                            label: 'button-secondary-small-label',
                          } }
                          onClick={ () => setOpenWithdrawFundsModal(true) }
                        >
                          Withdraw
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 }>
                      <p className='para light'> Savings </p>
                      <div className='display-inline-flex mr-10'>
                        <h3 className='h3'> 10,452 QBE </h3>
                        <h3 className='h3 price-green ml-10'> +120 QBE </h3>
                      </div>
                      <div className='display-inline-flex mr-10'>
                        <h3 className='h3 light'> $10,452 USD </h3>
                        <h3 className='h3 light price-green ml-10'> +$120 USD </h3>
                      </div>
                      <div className='mt-15'>
                        <Button
                          className='wide-button'
                          classes={ {
                            root: 'button-primary-small',
                            label: 'button-primary-small-label',
                          } }
                          onClick={ () => setOpenAddToSavingsModal(true) }
                        >
                          Add to savings
                        </Button>
                      </div>
                      <div className='mt-15'>
                        <Button
                          className='wide-button'
                          classes={ {
                            root: 'button-secondary-small',
                            label: 'button-secondary-small-label',
                          } }
                          onClick={ () => setOpenRemoveFromSavingsModal(true) }
                        >
                          Remove from Savings
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className='mt-50'>
            <h3 className='h3 mb-10'> Transaction History </h3>
            <Grid container spacing={ 3 } alignItems='flex-end'>
              <Grid container item xl={ 4 } lg={ 4 } md={ 4 } sm={ 6 } spacing={ 1 }>
                <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
                  <h4 className='h4'> Start Date</h4>
                  <TextField
                    className='text-field-para is-fullwidth'
                    type='date'
                    variant='outlined'
                    margin='dense'
                  />
                </Grid>
                <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
                  <h4 className='h4'> End Date</h4>
                  <TextField
                    className='text-field-para is-fullwidth'
                    type='date'
                    variant='outlined'
                    margin='dense'
                  />
                </Grid>
              </Grid>
              <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 6 }>
                <div className='mt-10 display-inline-flex justify-between align-items-center is-fullwidth'>
                  <p className='para text-link-underlined ml-30'> Today </p>
                  <p className='para text-link ml-30'> This Week </p>
                  <p className='para text-link ml-30'> This Month </p>
                  <p className='para text-link ml-30'> This Year </p>
                  <p className='para text-link ml-30'> All </p>
                  <IconButton
                    className='ml-50 mr-10'
                  >
                    <FontAwesomeIcon icon={ faDownload } className='custom-fa-icon' />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
            <div className='search-input mt-20'>
              <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
              <InputBase
                placeholder='Search Transactions'
                className='input-field'
              />
            </div>
          </div>
          <div className='mt-30'>
            {transactionDetails.map((transaction) => (
              <TransactionDetails
                key={ transactionDetails.transactionId }
                transaction={ transaction }
              />
            ))}
          </div>
        </div>
      </Box>
      {openSendQBEModal && (
      <SendQBETokenModal
        open={ openSendQBEModal }
        onClose={ () => setOpenSendQBE(false) }
        onSubmit={ () => setOpenSendQBE(false) }
      />
      )}
      {openAddToSavingsModal && (
      <AddToSavingsModal
        open={ openAddToSavingsModal }
        onClose={ () => setOpenAddToSavingsModal(false) }
        onSubmit={ () => setOpenAddToSavingsModal(false) }
      />
      )}
      {openRemoveFromSavingsModal && (
      <RemoveFromSavingsModal
        open={ openRemoveFromSavingsModal }
        onClose={ () => setOpenRemoveFromSavingsModal(false) }
        onSubmit={ () => setOpenRemoveFromSavingsModal(false) }
      />
      )}
      {openAddFundsModal && (
      <AddFundsModal
        open={ openAddFundsModal }
        onClose={ () => setOpenAddFundsModal(false) }
        onSubmit={ () => setOpenAddFundsModal(false) }
      />
      )}
      {openWithdrawFundsModal && (
      <WithdrawFundsModal
        open={ openWithdrawFundsModal }
        onClose={ () => setOpenWithdrawFundsModal(false) }
        onSubmit={ () => setOpenWithdrawFundsModal(false) }
      />
      )}
      {openWalletSettingsModal && (
      <WalletSettingsModal
        open={ openWalletSettingsModal }
        onClose={ () => setOpenWalletSettingsModal(false) }
      />
      )}
      {openOrderPaymentCardModal && (
      <OrderPaymentCardModal
        open={ openOrderPaymentCardModal }
        onClose={ () => setOpenOrderPaymentCardModal(false) }
      />
      )}
    </>
  )
}

export default WalletDetails
