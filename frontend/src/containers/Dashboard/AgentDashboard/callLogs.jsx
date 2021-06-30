import React from 'react'
import {
  DialogTitle, Dialog, DialogActions, IconButton, DialogContent, Grid, TextField, Button,
  TableContainer, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes, faPhoneAlt, faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { dummyCallLogsData } from '../testData'
import './style.scss'

const CallLogs = ({
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
        <div className='h2'>Call Logs</div>
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
      <div className='out-div'>
        <Grid container spacing={ 3 } justify='flex-start' alignItems='flex-end'>
          <Grid item xl={ 2 } lg={ 2 } md={ 3 } sm={ 6 } xs={ 6 }>
            <h4 className='h4 mb-5'> Start Date</h4>
            <TextField
              className='text-field-para is-fullwidth'
              type='date'
              variant='outlined'
              margin='dense'
            />
          </Grid>
          <Grid item xl={ 2 } lg={ 2 } md={ 3 } sm={ 6 } xs={ 6 }>
            <h4 className='h4 mb-5'> End Date</h4>
            <TextField
              className='text-field-para is-fullwidth'
              type='date'
              variant='outlined'
              margin='dense'
            />
          </Grid>
          <Grid item container xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 } alignItems='flex-end'>
            {[ 'Today', 'This Week', 'This Month', 'This Year' ].map((timeFilter) => (
              <Grid key={ timeFilter } item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
                <Button classes={ {
                  root: 'button-primary-text large-height',
                  label: 'button-primary-text-label',
                } }
                >
                  {timeFilter}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
      <TableContainer className='mt-20 no-padding'>
        <TableHead>
          <TableRow>
            {[ '#', 'Date/Time', 'Length', 'Status',
              'Phone', 'Name', 'Campaign', 'In/Out', 'Alt', 'Hangup',
            ].map((rowItem) => (
              <TableCell key={ rowItem }>
                <h4 className='h4'>{rowItem}</h4>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyCallLogsData.map((rowItem) => (
            <TableRow key={ rowItem.id }>
              <TableCell>
                <span className='para'>{rowItem.id}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.dateTime}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.length}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.status}</span>
              </TableCell>
              <TableCell>
                <FontAwesomeIcon icon={ faPhoneAlt } className='custom-fa-icon mr-5' />
                <span className='para primary'>{rowItem.phoneNumber}</span>
              </TableCell>
              <TableCell>
                <FontAwesomeIcon icon={ faInfoCircle } className='custom-fa-icon mr-5' />
                <span className='para primary'>{rowItem.name}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.campaign}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.inOut}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.alt}</span>
              </TableCell>
              <TableCell>
                <span className='para'>{rowItem.hangup}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>

    </DialogContent>
  </Dialog>
)

CallLogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CallLogs
