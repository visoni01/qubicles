import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton,
  Switch, Grid, FormControl, InputLabel, Select, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { agentsData } from '../testData'
import XferOnHoldModal from './xferOnHold'
import './style.scss'

const Xfer = ({
  open, onClose, onSubmit,
}) => {
  const [ openXferOnHoldModal, setOpenXferOnHoldModal ] = useState(false)
  return (
    <>
      <Dialog
        disableScrollLock
        open={ open }
        onClose={ onClose }
        scroll='paper'
        maxWidth='md'
        className='custom-modal agent-root'
        classes={ { paper: 'agent-modals xfer-modal' } }
      >
        <div className='header'>
          <DialogTitle>
            <div className='h2'>X-fer</div>
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
        <DialogContent classes={ { root: 'xfer-modal-content' } }>
          <h4 className='h4 mt-20'>Phone Number</h4>
          <TextField
            className='text-field-para is-fullwidth'
            variant='outlined'
            margin='dense'
            type='number'
            placeholder='e.g. 1234567890'
          />

          <div className='display-inline-flex justify-between align-items-center is-halfwidth mt-10'>
            <h4 className='h4'>Internal Warm X-fer</h4>
            <Switch
              className='switches'
              color='primary'
            />
          </div>
          <div className='is-fullwidth mt-20'>
            <Button
              className='wide-button'
              classes={ {
                root: 'button-primary-large',
                label: 'button-primary-large-label agent-lg-btn-label',
              } }
              onClick={ onSubmit }
            >
              Blind X-fer
            </Button>
            <div className='mt-10'>
              <Button
                onClick={ onClose }
                className='wide-button'
                classes={ {
                  root: 'button-secondary-large',
                  label: 'button-secondary-large-label agent-lg-btn-label',
                } }
              >
                Warm X-fer
              </Button>
            </div>
            <div className='mt-10'>
              <Button
                onClick={ () => setOpenXferOnHoldModal(true) }
                className='wide-button'
                classes={ {
                  root: 'button-secondary-large',
                  label: 'button-secondary-large-label agent-lg-btn-label',
                } }
              >
                Hold & Dial
              </Button>
            </div>
          </div>
          <div className='mt-20'>
            <Grid container spacing={ 3 }>
              <Grid item xl={ 5 } lg={ 5 } md={ 5 } sm={ 12 } xs={ 12 }>
                <div className='mt-20'>
                  <h4 className='h4 '> Presets </h4>
                  <p className='para mt-10 text-link'> Technical Support </p>
                  <p className='para mt-10 text-link'> Maecenas integer </p>
                  <p className='para mt-10 text-link'> Telius tristique </p>
                  <p className='para mt-10 text-link'> Vivera nisl </p>
                  <p className='para mt-10 text-link'> Adispicing porta </p>
                </div>
              </Grid>
              <Grid item xl={ 7 } lg={ 7 } md={ 7 } sm={ 12 } xs={ 12 }>
                <div className='mt-20'>
                  <h4 className='h4 '> Select An Agent To Transfer This Call To </h4>
                  <FormControl variant='outlined' className='drop-down-bar'>
                    <InputLabel margin='dense' variant='outlined' className='mt-10'>
                      Choose agent
                    </InputLabel>
                    <Select
                      margin='dense'
                      variant='outlined'
                      native
                      label='Choose agent'
                      className='mt-10'
                    >
                      <option aria-label='None' value='' />
                      {agentsData.map((agent) => (
                        <option key={ agent.id } value={ agent.agentName }>
                          { agent.agentName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <div className='mt-10'>
                    <Button
                      className='wide-button'
                      classes={ {
                        root: 'button-primary-large',
                        label: 'button-primary-large-label agent-lg-btn-label',
                      } }
                      onClick={ onSubmit }
                      disabled
                    >
                      X-fer To Agent
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
      <XferOnHoldModal
        open={ openXferOnHoldModal }
        onClose={ () => setOpenXferOnHoldModal(false) }
      />
    </>
  )
}

Xfer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Xfer
