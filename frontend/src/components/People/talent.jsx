import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import StarRatings from 'react-star-ratings'
import { IconButton } from '@material-ui/core'

const UserDescription = ({
  name, joinedSince, title, rating, hourlyRate, courses, awards, jobs, hasPhone, hasBackgroundCheck, description,
}) => (
  <div className='forum-channel is-block'>
    <div className='is-flex'>
      <div className='mr-20'>
        <div className='is-flex'>
          <div className='channel-icon mr-10'>
            <div className='MuiAvatar-root MuiAvatar-circle avatar MuiAvatar-colorDefault'>{name && name[ 0 ]}</div>
          </div>
          <div className='display-inline-grid'>
            <span>{name}</span>
            <StarRatings
              rating={ rating }
              starRatedColor='orange'
              numberOfStars={ 5 }
              name='rating'
              starDimension='16px'
              starSpacing='0px'
            />
          </div>
        </div>
        <span className='is-size-7'>
          {`Member since ${ joinedSince }`}
        </span>
      </div>
      <div className='channel-meta user-info display-inline-flex width-full'>
        <div className='width-full'>
          <span>{title}</span>
          <div className='display-inline-flex width-full'>
            <div className='mr-20'>
              <span className='text-align-center is-size-7'>{`${ hourlyRate }/hr`}</span>
              <span className='is-size-7'>Hourly rate</span>
            </div>
            <div className='mr-20'>
              <span className='text-align-center is-size-7'>{courses}</span>
              <span className='is-size-7'>Courses</span>
            </div>
            <div className='mr-20'>
              <span className='text-align-center is-size-7'>{awards}</span>
              <span className='is-size-7'>Awards</span>
            </div>
            <div className='mr-20'>
              <span className='text-align-center is-size-7'>{jobs}</span>
              <span className='is-size-7'>Jobs</span>
            </div>
            <div className='mr-20 background-check-div'>
              <input type='checkbox' checked={ hasPhone } readOnly className='text-align-center checkbox-style' />
              <span className='is-size-7'>Phone</span>
            </div>
            <div className='mr-20'>
              <input
                type='checkbox'
                checked={ hasBackgroundCheck }
                readOnly
                className='text-align-center checkbox-style'
              />
              <span className='is-size-7'>Background</span>
            </div>
          </div>
        </div>
        <IconButton className='menu-icon-button'>
          <FontAwesomeIcon icon={ faEllipsisV } className='people-header-icons' />
        </IconButton>
      </div>
    </div>
    <p>{description}</p>
  </div>
)

UserDescription.defaultProps = {
  rating: 0,
  hourlyRate: 0,
  courses: 0,
  awards: 0,
  jobs: 0,
  hasPhone: 0,
  hasBackgroundCheck: 0,
}

UserDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  joinedSince: PropTypes.string.isRequired,
  rating: PropTypes.number,
  hourlyRate: PropTypes.number,
  courses: PropTypes.number,
  awards: PropTypes.number,
  jobs: PropTypes.number,
  hasPhone: PropTypes.bool,
  hasBackgroundCheck: PropTypes.bool,
}

export default UserDescription
