import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { defaultUser } from '../../assets/images/avatar'
import ProfileOptions from '../../containers/Profile/Agent/LeftRightSection/profileOptions'
// import { formatDate } from '../../utils/common'

const Introduction = ({
  imageName,
  rating,
  imageSrc,
  name,
  location,
  userDetails,
  candidateId,
  hasBlockedUser,
  // date,
}) => (
  <div className='is-flex is-between align-items-end'>
    <div className='display-inline-flex is-fullwidth align-items-center'>
      <Avatar className='profile-pic large' alt={ imageName } src={ imageSrc || defaultUser } />
      <div className='ml-10'>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ rating }
          precision={ 0.5 }
        />
        <h4 className='h4'>{name}</h4>
        <p className='para light'>
          <FontAwesomeIcon className='custom-fa-icon light mr-10' icon={ faMapMarkerAlt } />
          {location}
        </p>
        {/* WIP untill registration date doubt resolve */}
        {/* <p className='para light'>
        Member since
        {' '}
        {formatDate(date, 'MM/YYYY')}
      </p> */}
      </div>
    </div>
    {userDetails && !_.isEqual(userDetails.user_code, 'employer')
    && candidateId && candidateId !== userDetails.user_id && (
      <ProfileOptions
        candidateId={ candidateId }
        hasBlockedUser={ hasBlockedUser }
      />
    )}
  </div>
)

Introduction.defaultProps = {
  imageName: '',
  rating: null,
  imageSrc: '',
  name: '',
  location: '',
  userDetails: {
    user_code: '',
    user_id: '',
  },
  candidateId: null,
  hasBlockedUser: false,
  // date: contactCenterIntroduction.date,
}

Introduction.propTypes = {
  imageName: PropTypes.string,
  rating: PropTypes.number,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  userDetails: PropTypes.shape({
    user_code: PropTypes.string,
    user_id: PropTypes.number,
  }),
  candidateId: PropTypes.number,
  hasBlockedUser: PropTypes.bool,
  // date: PropTypes.string,
}

export default Introduction
