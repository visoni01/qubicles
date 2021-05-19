import {
  Avatar,
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
} from '@material-ui/core'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { terry } from '../../../../../../assets/images/avatar'
import AnswerValidationCard from './answerValidationCard'

const TestEntriesValidation = ({ open, setOpen }) => {
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [ setOpen ])

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal validation-modal-root'
    >
      <div className='header'>
        <DialogTitle>
          <div className='h2 mr-30'>Validation</div>
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
      <DialogContent>
        <div className='display-inline-flex align-items-center is-fullwidth mt-10 mb-20'>
          <Avatar className='user-pic' alt={ terry } src={ terry } />
          <p className='h3 user-name'>Terry Valdez</p>
        </div>
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <AnswerValidationCard />
          </Grid>
          <Grid item xs={ 12 }>
            <AnswerValidationCard />
          </Grid>
          <Grid item xs={ 12 }>
            <AnswerValidationCard />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='modal-actions validation-modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleClose }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TestEntriesValidation.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default TestEntriesValidation
