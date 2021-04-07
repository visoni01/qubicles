import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './styles.scss'
// import { formatDate } from '../../../utils/common'
import { contactCenterIntroduction } from './testData'
import { defaultUser } from '../../../assets/images/avatar'

const Introduction = ({
  imageName,
  rating,
  imageSrc,
  name,
  location,
  // date,
}) => (
  <div className='introduction-root'>
    <div className='display-inline-flex is-fullwidth'>
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
  </div>
)

Introduction.defaultProps = {
  imageName: contactCenterIntroduction.imageName,
  rating: contactCenterIntroduction.rating,
  imageSrc: contactCenterIntroduction.imageSrc,
  name: contactCenterIntroduction.name,
  location: contactCenterIntroduction.location,
  // date: contactCenterIntroduction.date,
}

Introduction.propTypes = {
  imageName: PropTypes.string,
  rating: PropTypes.number,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  // date: PropTypes.string,
}

export default Introduction
