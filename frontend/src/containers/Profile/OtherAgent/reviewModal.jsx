import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating'

const ReviewModal = ({
  open, onClose, onSubmit,
}) => {
  const [ reviewRating, setReviewRating ] = useState(2)
  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ onClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal'
    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Review</h2>
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
        <h4 className='h4'>Select your rating</h4>
        <Rating
          className='rating-star mt-20'
          classes={ { label: 'rating-star-label' } }
          name='review-rating'
          size='large'
          value={ reviewRating }
          precision={ 0.5 }
          onChange={ (event, newValue) => {
            setReviewRating(newValue)
          } }
        />
        <h4 className='h4 mt-30'>Review</h4>
        <TextField
          margin='dense'
          id='name'
          fullWidth
          rows={ 7 }
          multiline
          variant='outlined'
          placeholder='Max 256 characters'
          required
          name='review'
          className='mt-10'
        />
        <div className='display-inline-flex justify-between is-fullwidth mt-20'>
          <Button
            color='secondary'
            onClick={ onClose }
            className='cancel-button'
          >
            Cancel
          </Button>
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ onSubmit }
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

ReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ReviewModal
