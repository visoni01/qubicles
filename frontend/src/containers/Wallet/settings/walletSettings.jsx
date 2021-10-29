import React from 'react'
import {
  FormControl, InputLabel, Select, Switch, Button, TextField,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { paymentCardData } from '../testData'

const WalletSettings = ({ onClose }) => (
  <div className='wallet-settings'>
    <div className='display-inline-flex justify-between align-items-center is-halfwidth '>
      <h3 className='h3 bold'> Auto Refill </h3>
      <Switch
        className='switches'
        color='primary'
      />
    </div>
    <h4 className='h4 bold mt-20'> Refill Amount </h4>
    <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
      <span className='para'> Automaticall buy </span>
      <TextField
        className='text-field-para wallet-settings-input'
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        variant='outlined'
        margin='dense'
        placeholder='USD'
      />
      <span className='para'> QBE when available balance is less than </span>
      <TextField
        className='text-field-para wallet-settings-input'
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        variant='outlined'
        margin='dense'
        placeholder='USD'
      />
    </div>
    <div className='is-halfwidth mt-20'>
      <h4 className='h4'> Refill from </h4>
      <FormControl variant='outlined' className='drop-down-bar'>
        <InputLabel margin='dense' variant='outlined' className='mt-10'>
          Choose card
        </InputLabel>
        <Select
          margin='dense'
          variant='outlined'
          native
          label='Choose category'
          className='mt-10'
        >
          <option aria-label='None' value='' />
          {paymentCardData.map((card) => (
            <option key={ card.id } value={ card.cardDetails }>
              { `${ card.bankName } ${ card.cardDetails }`}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
    <div className='display-inline-flex justify-between align-items-center is-fullwidth mt-20'>
      <Button
        color='secondary'
        onClick={ onClose }
        className='cancel-button'
      >
        Cancel
      </Button>
      <Button
        disabled
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
      >
        Save
      </Button>
    </div>
  </div>
)

WalletSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default WalletSettings
