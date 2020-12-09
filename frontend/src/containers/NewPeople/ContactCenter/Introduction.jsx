import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './styles.scss'
import { formatDate } from '../../../utils/common'

const Introduction = ({
  imageName,
  rating,
  imageSrc,
  name,
  location,
  date,
  title,
  description,
}) => (
  <div className='introduction-root'>
    <div className='display-inline-flex is-fullwidth'>
      <Avatar className='profile-pic large' alt={ imageName } src={ imageSrc } />
      <div className='ml-15'>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ rating }
          precision={ 0.1 }
        />
        <h4 className='h4'>{name}</h4>
        <p className='para light'>
          <FontAwesomeIcon className='custom-fa-icon light mr-10' icon={ faMapMarkerAlt } />
          {location}
        </p>
        <p className='para light'>
          Member since
          {' '}
          {formatDate(date, 'MM/YYYY')}
        </p>
      </div>
    </div>

    <h4 className='h4 margin-top-bottom-10'>
      {title}
    </h4>
    <p className='para'>
      {description}
    </p>
  </div>
)

Introduction.propTypes = {
  imageName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Introduction
