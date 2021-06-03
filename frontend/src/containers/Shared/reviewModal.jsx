import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, TextField, CircularProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ViewSetSubRatings from './viewSubRatings'
import './styles.scss'
import ConfirmationModal from '../../components/CommonModal/confirmationModal'

const ReviewModal = ({
  loading, open, onClose, reviewHeading, onSubmit, ratingLabels,
  rating, setRating, reviewText, setReviewText, reviewRequired,
}) => {
  const [ openConfirmation, setOpenConfirmation ] = useState(false)
  const handleSubmitReview = useCallback(() => {
    setOpenConfirmation(false)
    onSubmit()
  }, [ onSubmit ])

  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ onClose }
      classes={ { paper: 'review-modal-paper' } }
      className='custom-modal'
    >
      <div className='header'>
        <DialogTitle>
          <div className='display-inline-flex align-items-center'>
            <h2 className='h2 review-modal-heading'>Review</h2>
            {loading && (
            <CircularProgress size={ 25 } />
            )}
          </div>
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
          <span className='para light ml-5'>
            {`(${ !reviewRequired ? 'Optional, ' : '' }${ 255 - reviewText.length } characters)`}
          </span>
        </h4>
        <TextField
          margin='dense'
          variant='outlined'
          fullWidth
          rows={ 5 }
          value={ reviewText.slice(0, 255) }
          onChange={ (e) => setReviewText(e.target.value.slice(0, 255)) }
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
          // or if reviewRequired is true and review text is empty
          disabled={ !Object.keys(rating).reduce((acc, curr) => (acc * rating[ curr ]), 1)
          || reviewText.length > 255
          || loading
          || (reviewRequired && reviewText.length === 0) }
          onClick={ () => setOpenConfirmation(true) }
        >
          Submit
        </Button>
      </DialogActions>

      <ConfirmationModal
        open={ openConfirmation }
        handleClose={ () => setOpenConfirmation(false) }
        handleConfirm={ handleSubmitReview }
        confirmButtonText='Confirm'
        message='You can submit the review only once. Do you want to continue?'
      />

    </Dialog>
  )
}

ReviewModal.defaultProps = {
  reviewHeading: '',
  loading: false,
  reviewRequired: false,
}

ReviewModal.propTypes = {
  loading: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ratingLabels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rating: PropTypes.shape({}).isRequired,
  setRating: PropTypes.func.isRequired,
  reviewText: PropTypes.string.isRequired,
  setReviewText: PropTypes.func.isRequired,
  reviewHeading: PropTypes.string,
  reviewRequired: PropTypes.bool,
}

export default ReviewModal
