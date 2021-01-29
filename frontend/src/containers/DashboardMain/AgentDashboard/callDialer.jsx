import React, {
  useState, useCallback, useEffect, useRef,
} from 'react'
import {
  IconButton, Popover, DialogTitle, DialogActions, TextField, Grid, Button, Avatar,
} from '@material-ui/core'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  dialPadIcon, outboundCallIcon, greenPhoneIcon,
} from '../../../assets/images/agentDashboard'
import { carolin } from '../../../assets/images/avatar'

const CallDialer = ({
  open, anchorEl, handleClose,
}) => {
  const [ openManualDial, setOpenManualDial ] = useState(false)
  const [ isInputFocused, setInputFocused ] = useState(true)
  const dialInputFieldRef = useRef()

  const {
    register, errors, handleSubmit, setValue, getValues,
  } = useForm({
    validationSchema: yup.object().shape({
      dialedNumber: yup.string().matches(/^(\d{10})$/, '*Please enter a valid number')
        .required('*Required'),
    }),
  })

  const setFocusToDialPad = useCallback(() => {
    if (dialInputFieldRef.current) {
      dialInputFieldRef.current.focus()

      // Moving cursor to the end
      dialInputFieldRef.current.selectionStart = dialInputFieldRef.current.value.length
      dialInputFieldRef.current.selectionEnd = dialInputFieldRef.current.value.length
      setInputFocused(true)
    }
  }, [ dialInputFieldRef ])

  useEffect(() => {
    if (open && dialInputFieldRef.current) {
      setFocusToDialPad()
    }
  }, [ open, dialInputFieldRef, isInputFocused, setFocusToDialPad ])

  const handleDialNumberButtonClick = useCallback((e) => {
    setValue('dialedNumber', getValues().dialedNumber + e.currentTarget.id)
  }, [ setValue, getValues ])

  const toggleOpenManualDial = useCallback(() => {
    setOpenManualDial((current) => !current)
  }, [ ])

  const onSubmit = () => {
    // Dial Phone WIP
  }

  return (
    <Popover
      disableScrollLock
      open={ open }
      className='custom-modal'
      onClose={ handleClose }
      anchorEl={ anchorEl }
      classes={ { paper: 'call-dialer-popover' } }
    >
      <div className='header'>
        <DialogTitle>
          <h3 className='h3'>My Web Phone</h3>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <div className='padding-10 no-padding-top'>
        <div className='display-inline-flex is-fullwidth align-items-start pr-10'>
          <IconButton
            onClick={ toggleOpenManualDial }
          >
            <img src={ dialPadIcon } alt='Dialpad' />
          </IconButton>
          <span className='para light sz-lg mt-15'>
            or
          </span>
          <div className='dialer-field ml-10'>
            <TextField
              name='dialedNumber'
              className='text-field-para'
              placeholder='Enter a number...'
              variant='outlined'
              margin='dense'
              autoFocus
              error={ errors.dialedNumber }
              helperText={ errors.dialedNumber ? errors.dialedNumber.message : '' }
              inputRef={ (e) => {
                register(e)
                dialInputFieldRef.current = e
              } }
              onBlur={ () => setInputFocused(false) }
            />
          </div>
        </div>
        <div className='web-phone-container'>
          {openManualDial
            ? (
              <form onSubmit={ handleSubmit(onSubmit) }>
                <div className='manual-dial padding-20'>
                  <Grid
                    container
                    spacing={ 2 }
                    justify='space-evenly'
                  >
                    {[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#' ].map((val) => (
                      <Grid item key={ val } lg={ 4 } md={ 4 } sm={ 4 } xs={ 4 } className='text-align-last-center'>
                        <Button
                          classes={ {
                            root: 'button-secondary-small dial-button',
                            label: 'button-secondary-small-label dial-button-label',
                          } }
                          onClick={ handleDialNumberButtonClick }
                          id={ val }
                        >
                          {val}
                        </Button>
                      </Grid>
                    ))}
                    <Grid itemlg={ 4 } md={ 4 } sm={ 4 } xs={ 4 } className='text-align-last-center'>
                      <IconButton
                        type='submit'
                      >
                        <img src={ greenPhoneIcon } alt='Dialpad' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              </form>
            ) : (
              <div className='call-history pl-10'>
                <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
                  <h4 className='h4'>Call History</h4>
                  <IconButton>
                    <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon sz-md' />
                  </IconButton>
                </div>
                <div className='history-list'>
                  {[ 0, 1, 2, 3, 4 ].map((val) => (
                    <div key={ val } className='list-divider no-margin pb-10 pt-10'>
                      <div className='display-inline-flex align-items-center'>
                        <img src={ outboundCallIcon } alt='Outbound' className='mr-20' />
                        <div className='display-inline-flex align-items-center'>
                          <Avatar className='profile-pic no-margin' alt='Carolin' src={ carolin } />
                          <div className='ml-10'>
                            <h4 className='h4 sz-sm'>
                              Marilyn Pearson
                            </h4>
                            <p className='para light sz-sm mt-5'>
                              11:31 AM, 26 Oct, 2020
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </Popover>
  )
}

CallDialer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default CallDialer
