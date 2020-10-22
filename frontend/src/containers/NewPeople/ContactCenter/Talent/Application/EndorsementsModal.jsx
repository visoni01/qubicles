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
  <Dialog open={ open } onClose={ handleClose } classes={ { paper: 'endorsement-modal' } }>
    <div className='is-flex'>
      <DialogTitle className='width-full'>
        <h2> Endorsements </h2>
      </DialogTitle>
      <DialogActions className='cross-button'>
        <IconButton className='is-size-6 mt-10' onClick={ handleClose }>
          <FontAwesomeIcon icon={ faTimes } />
        </IconButton>
      </DialogActions>
    </div>
    <DialogContent>
      <h4> Customer Service </h4>

      {/* First Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='carolin' src={ carolin } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='paragraph-heading'> Jasmine Palmer </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='large'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='paragraph-light-content'> Customer Service Manager at Microsoft </p>
        </div>
      </div>
      <Divider className='divider' />

      {/* Second Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='ray' src={ ray } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='paragraph-heading'> Ronnie Cooper </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='large'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='paragraph-light-content'> Customer Service Manager at BlueSail </p>
        </div>
      </div>
      <Divider className='divider' />

      {/* Third Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='thomas' src={ thomas } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='paragraph-heading'> Kevin Banks </p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='large'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='paragraph-light-content'> Customer Service Manager at Setonic </p>
        </div>
      </div>
      <Divider className='divider' />

      {/* Fourth Dummy Data */}
      <div className='endorsement-section'>
        <Avatar className='profile-pic' alt='carolin' src={ carolin } />
        <div className='middle-part'>
          <div className='display-inline-flex'>
            <p className='paragraph-heading'>Jasmine Palmer</p>
            <Rating
              className='rating-star'
              name='read-only'
              readOnly
              size='large'
              value={ 5 }
              precision={ 0.1 }
            />
          </div>
          <p className='paragraph-light-content'> Customer Service Manager at Microsoft </p>
        </div>
      </div>
      <Divider className='divider' />
    </DialogContent>
  </Dialog>
)

Endorsements.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default Endorsements
