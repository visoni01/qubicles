import React from 'react'
import {
  Box, Button, Grid, InputBase, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons'
import creditCard from '../../assets/images/creditcard.svg'
import TransactionDetails from './transactionDetails'
import { transactionDetails } from './testData'

const WalletDetails = () => (
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
      >
        Wallet Settings
      </Button>
    </div>
    <div>
      <div className='mt-50 wallet-details'>
        <Grid container spacing={ 3 }>
          <Grid item xl={ 5 } lg={ 5 } md={ 5 } sm={ 6 }>
            {/* Card Pic */}
            <img src={ creditCard } alt='creditCard' className='credit-card-pic h4' />
          </Grid>
          <Grid item xl={ 7 } lg={ 7 } md={ 7 } sm={ 6 }>
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
              <Grid container spacing={ 4 }>
                <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
                  <p className='para light'> Available </p>
                  <h3 className='h3'> 2,631 QBE </h3>
                  <h3 className='h3 light'> $2,631 USD </h3>
                  <div className='display-inline-flex justify-between is-fullwidth mt-15'>
                    <Button
                      classes={ {
                        root: 'button-primary-small',
                        label: 'button-primary-small-label',
                      } }
                    >
                      Add Funds
                    </Button>
                    <Button
                      classes={ {
                        root: 'button-primary-small',
                        label: 'button-primary-small-label',
                      } }
                    >
                      Send
                    </Button>
                  </div>
                  <div className='mt-15'>
                    <Button
                      className='wide-button'
                      classes={ {
                        root: 'button-secondary-small',
                        label: 'button-secondary-small-label',
                      } }
                    >
                      Withdraw
                    </Button>
                  </div>
                </Grid>
                <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
                  <p className='para light'> Savings </p>
                  <div className='display-inline-flex'>
                    <h3 className='h3'> 10,452 QBE </h3>
                    <h3 className='h3 price-green ml-10'> +120 QBE </h3>
                  </div>
                  <div className='display-inline-flex'>
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
        <h3 className='h3'> Transaction History </h3>
        <div className='mt-10 display-inline-flex'>
          <h4 className='h4 mr-20'> Start Date</h4>
          <h4 className='h4 ml-60'> End Date</h4>
        </div>
        <Grid container spacing={ 4 }>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 6 }>
            <div className='mt-10 display-inline-flex'>
              <div>
                <InputBase
                  placeholder='Start Date'
                  className='search-input'
                />
              </div>
              <div className='ml-30'>
                <InputBase
                  placeholder='End Date'
                  className='search-input '
                />
              </div>

            </div>
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
)

export default WalletDetails
