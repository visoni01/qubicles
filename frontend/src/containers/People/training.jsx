import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { IconButton } from '@material-ui/core'
import qubiclesLogo from '../../assets/images/qbe-header-logo.png'

const TrainingDescription = ({
  title, trainingRate, lessons, students, rating, category, language, trainer, description, videoLink,
}) => (
  <div className='forum-channel'>
    <iframe
      src={ videoLink }
      title='Qubicles'
      className='training-video'
    />
    <div className='width-full'>
      <div className='channel-meta user-info display-inline-flex training-title-info-div'>
        <div className='training-title-info-div'>
          <span>{title}</span>
          <div className='display-inline-flex width-full'>
            <div className='mr-20 is-flex'>
              <img className='training-qubicles-logo' src={ qubiclesLogo } alt='logo' />
              <span className='is-size-7'>{`${ trainingRate } qbe`}</span>
            </div>
            <div className='mr-20 is-flex'>
              <span className='text-align-center is-size-7 mr-10'>{lessons}</span>
              <span className='is-size-7'>Lessons</span>
            </div>
            <div className='mr-20 is-flex'>
              <span className='text-align-center is-size-7 mr-10'>{students}</span>
              <span className='is-size-7'>Students</span>
            </div>
          </div>
        </div>
        <StarRatings
          rating={ rating }
          starRatedColor='orange'
          numberOfStars={ 5 }
          name='rating'
          starDimension='16px'
          starSpacing='0px'
        />
        <IconButton className='menu-icon-button'>
          <FontAwesomeIcon icon={ faEllipsisV } className='people-header-icons' />
        </IconButton>
      </div>
      <p className='ml-20 custom-subtitle'>{description}</p>
      <div className='ml-20 mt-20'>
        <span className='is-size-7 training-tag-type-style'>{category}</span>
        <span className='is-size-7 training-tag-type-style ml-20'>{language}</span>
        <span className='is-size-7 training-by-span'>{`Training by ${ trainer }`}</span>
      </div>
    </div>
  </div>
)

TrainingDescription.defaultProps = {
  rating: 0,
  students: 0,
  category: 'category',
  language: 'language',
  videoLink: '',
}

TrainingDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trainingRate: PropTypes.number.isRequired,
  lessons: PropTypes.number.isRequired,
  rating: PropTypes.number,
  students: PropTypes.number,
  category: PropTypes.string,
  language: PropTypes.string,
  trainer: PropTypes.string.isRequired,
  videoLink: PropTypes.string,
}

export default TrainingDescription
