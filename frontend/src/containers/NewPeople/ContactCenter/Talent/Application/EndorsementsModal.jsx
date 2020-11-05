import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ray, carolin, thomas } from '../../../../../assets/images/avatar'
import '../styles.scss'

const Endorsements = ({
  open, handleClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ handleClose }
    fullWidth
    maxWidth='sm'
    classes={ { paper: 'endorsement-modal' } }
    className='custom-modal'
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>Endorsements</h2>
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
      <h4 className='h4'> Customer Service </h4>

      {/* First Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='carolin' src={ carolin } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='para bold'> Jasmine Palmer </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='para light'> Customer Service Manager at Microsoft </p>
        </div>
      </div>
      <Divider className='divider mt-10 mb-10' />

      {/* Second Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='ray' src={ ray } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='para bold'> Ronnie Cooper </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='para light'> Customer Service Manager at BlueSail </p>
        </div>
      </div>
      <Divider className='divider mt-10 mb-10' />

      {/* Third Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='thomas' src={ thomas } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='para bold'> Kevin Banks </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='para light'> Customer Service Manager at Setonic </p>
        </div>
      </div>
      <Divider className='divider mt-10 mb-10' />

      {/* Fourth Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='carolin' src={ carolin } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='para bold'>Jasmine Palmer</p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='small'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='para light'> Customer Service Manager at Microsoft </p>
        </div>
      </div>
      <Divider className='divider mt-10 mb-10' />
    </DialogContent>
  </Dialog>
)

Endorsements.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default Endorsements
