import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../../../../containers/People/ContactCenter/Talent/styles.scss'

const Endorsements = ({
  open, handleClose, endorsementsList, skillName,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ handleClose }
    fullWidth
    maxWidth='sm'
    classes={ { paper: 'endorsement-modal' } }
    className='custom-modal auto-height'
  >
    <div className='header'>
      <DialogTitle>
        <div className='h2'>Endorsements</div>
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
      <h3 className='h3 mb-10'>
        {skillName}
      </h3>
      {endorsementsList.map((endorsement) => (
        <div key={ endorsement.id } className='endorsement-section list-divider'>
          <Avatar
            className='profile-pic no-margin-left no-margin-top'
            alt={ endorsement.userProfile.name }
            src={ endorsement.userProfile.profilePic }
          />
          <div className='middle-part mb-10'>
            <div className='display-inline-flex'>
              <p className='para bold'>
                {endorsement.userProfile.name}
              </p>
              <Rating
                className='rating-star'
                name='read-only'
                readOnly
                size='small'
                value={ endorsement.rating }
                precision={ 0.5 }
              />
            </div>
            <p className='para light'>
              { endorsement.workTitle }
            </p>
            <p className='para mt-10'>
              { endorsement.comment }
            </p>
          </div>
        </div>
      ))}
    </DialogContent>
  </Dialog>
)

Endorsements.defaultProps = {
  skillName: '',
  endorsementsList: [],
}

Endorsements.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  skillName: PropTypes.string,
  endorsementsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  })),
}

export default Endorsements
