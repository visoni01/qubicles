import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import { testResumeIntroduction } from './testData'
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
          className='rating-star no-margin'
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

Introduction.defaultProps = {
  imageName: testResumeIntroduction.imageName,
  rating: testResumeIntroduction.rating,
  imageSrc: testResumeIntroduction.imageSrc,
  name: testResumeIntroduction.name,
  location: testResumeIntroduction.location,
  date: testResumeIntroduction.date,
  title: testResumeIntroduction.title,
  description: testResumeIntroduction.description,
}

Introduction.propTypes = {
  imageName: PropTypes.string,
  rating: PropTypes.number,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Introduction
