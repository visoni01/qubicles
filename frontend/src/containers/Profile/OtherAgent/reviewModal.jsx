import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ViewSetSubRatings from './viewSubRatings'
import './style.scss'

const ReviewModal = ({
  open, onClose, reviewHeading, onSubmit, ratingLabels,
  rating, setRating, reviewText, setReviewText,
}) => (
  <Dialog
    scroll='body'
    open={ open }
    onClose={ onClose }
    classes={ { paper: 'review-modal-paper' } }
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
      <h4 className='h4 light'>
        {reviewHeading}
      </h4>
      <ViewSetSubRatings
        rating={ rating }
        setRating={ setRating }
        ratingLabels={ ratingLabels }
      />
      <h4 className='h4 mt-30'>
        <span>Review</span>
        <span className='para light ml-5'>(Optional)</span>
      </h4>
      <TextField
        margin='dense'
        variant='outlined'
        fullWidth
        rows={ 5 }
        value={ reviewText }
        onChange={ (_, val) => setReviewText(val) }
        multiline
        placeholder='Write your review...'
        className='text-field-para'
      />
    </DialogContent>
    <DialogActions className='modal-actions'>
      <Button
        classes={ {
          root: 'button-secondary-small-red',
          label: 'button-secondary-small-label',
        } }
        onClick={ onClose }
      >
        Cancel
      </Button>
      <Button
        type='submit'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
          // Disable submit if any of rating is zero (minimum is 1)
        disabled={ !Object.keys(rating).reduce((acc, curr) => (acc * rating[ curr ]), 1) }
        onClick={ onSubmit }
      >
        Submit
      </Button>
    </DialogActions>

  </Dialog>
)

ReviewModal.defaultProps = {
  reviewHeading: '',
}

ReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ratingLabels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rating: PropTypes.shape({}).isRequired,
  setRating: PropTypes.func.isRequired,
  reviewText: PropTypes.string.isRequired,
  setReviewText: PropTypes.func.isRequired,
  reviewHeading: PropTypes.string,
}

export default ReviewModal
