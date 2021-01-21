import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase,
  Switch, Grid, FormControl, InputLabel, Select,
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
        fullWidth
        maxWidth='sm'
        className='custom-modal agent-root'
        classes={ { paper: 'agent-modals' } }
      >
        <div className='header'>
          <DialogTitle>
            <h2 className='h2'>X-fer</h2>
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
          <h4 className='h4 mt-30'>Phone Number</h4>
          <InputBase
            InputProps={ { inputProps: { min: 0, step: 1 } } }
            type='number'
            placeholder='e.g. 1234567890'
            className='search-input mt-10'
          />

          <div className='display-inline-flex justify-between align-items-center is-halfwidth mt-30'>
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
                root: 'button-primary-small',
                label: 'button-primary-small-label',
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
                  root: 'button-secondary-small',
                  label: 'button-secondary-small-label',
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
                  root: 'button-secondary-small',
                  label: 'button-secondary-small-label',
                } }
              >
                Hold & Dial
              </Button>
            </div>
          </div>
          <div className='mt-20'>
            <Grid container spacing={ 3 }>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
                <div className='mt-20'>
                  <h4 className='h4 '> Presets </h4>
                  <p className='para mt-10 text-link'> Technical Support </p>
                  <p className='para mt-10 text-link'> Maecenas integer </p>
                  <p className='para mt-10 text-link'> Telius tristique </p>
                  <p className='para mt-10 text-link'> Vivera nisl </p>
                  <p className='para mt-10 text-link'> Adispicing porta </p>
                </div>
              </Grid>
              <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
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
                        root: 'button-primary-small',
                        label: 'button-primary-small-label',
                      } }
                      onClick={ onSubmit }
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
