import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import { testResumeIntroduction } from './testData'
import './styles.scss'

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
          {date}
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
