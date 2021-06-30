import React from 'react'
import {
  DialogTitle, Dialog, DialogActions, IconButton, DialogContent,
  TableContainer, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPhoneAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { dummyCallbackData } from '../testData'

const Callback = ({
  open, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    maxWidth='xl'
    className='custom-modal agent-root'
  >
    <div className='header'>
      <DialogTitle>
        <div className='h2'>Callbacks</div>
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
    <DialogContent classes={ { root: 'list-modal-content' } }>
      <TableContainer>
        <TableHead>
          <TableRow>
            {[ '#', 'Callback Date/Time', 'Name', 'Phone',
              'Status', 'Campaign', 'Last Call Date/Time', 'Timezone',
            ].map((rowItem) => (
              <TableCell key={ rowItem }>
                <h4 className='h4'>{rowItem}</h4>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyCallbackData.map((rowItem) => (
            <TableRow key={ rowItem.id }>
              <TableCell>
                <span className='para'>{rowItem.id}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.dateTime}</span>
              </TableCell>
              <TableCell>
                <FontAwesomeIcon icon={ faInfoCircle } className='custom-fa-icon mr-5' />
                <span className='para primary'>{rowItem.name}</span>
              </TableCell>
              <TableCell>
                <FontAwesomeIcon icon={ faPhoneAlt } className='custom-fa-icon mr-5' />
                <span className='para primary'>{rowItem.phoneNumber}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.status}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.campaign}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.lastCallDateTime}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.timezone}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </DialogContent>
  </Dialog>
)

Callback.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Callback
