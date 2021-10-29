import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, FormControl, Select, InputLabel, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Year = [ 2020, 2019, 2018, 2016, 2015, 2014, 2013, 2012 ]

const InvoicesModal = ({ open, onClose }) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='sm'
    className='custom-modal wallet-root'
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'> Invoices </h2>
      </DialogTitle>
      <DialogActions className='cross-button'>
        <IconButton
          className='is-size-6'
          onClick={ onClose }
        >
          <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
        </IconButton>
      </DialogActions>
    </div>
    <DialogContent>
      <h4 className='h4 mt-30'>Year</h4>
      <FormControl variant='outlined' className='drop-down-bar is-width-30-per'>
        <InputLabel margin='dense' variant='outlined' className='mt-10'>
          Choose year
        </InputLabel>
        <Select
          margin='dense'
          variant='outlined'
          native
          label='Choose category'
          className='mt-10'
        >
          <option aria-label='None' value='' />
          {Year.map((year) => (
            <option key={ year } value={ year }>
              {year}
            </option>
          ))}
        </Select>
      </FormControl>
      <div className='display-inline-flex justify-between align-items-center is-fullwidth mt-20'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
      <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
        <div>
          <p className='para bold text-link'> INV-832 </p>
          <p className='para'> 10-01-2020 - 10/31/2020 </p>
        </div>
        <div>
          <p className='para '> 734 QBE </p>
          <p className='para light'> $734 USD </p>
        </div>
      </div>
      <Divider className='divider' />
    </DialogContent>
  </Dialog>
)

InvoicesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default InvoicesModal
