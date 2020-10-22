import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './newStyles.scss'

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
    <div className='display-inline-flex head-section'>
      <Avatar className='profile-pic' alt={ imageName } src={ imageSrc } />
      <div className='info-wrapper'>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='small'
          value={ rating }
          precision={ 0.1 }
        />
        <h4>{name}</h4>
        <p className='location'>
          <FontAwesomeIcon icon={ faMapMarkerAlt } />
          {location}
        </p>
        <p className='date'>
          {date}
        </p>
      </div>
    </div>
    <h4 className='title'>
      {title}
    </h4>
    <p className='description'>
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
