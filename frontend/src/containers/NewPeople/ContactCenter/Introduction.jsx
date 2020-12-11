import React from 'react'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './styles.scss'
import { formatDate } from '../../../utils/common'
import { contactCenterIntroduction } from './testData'

const Introduction = ({
  imageName,
  rating,
  imageSrc,
  name,
  location,
  date,
  title,
  description,
  isEdit,
  editText,
  handleEditModal,
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

    {isEdit && (
      <div className=' mt-20 mb-20'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ handleEditModal }
        >
          {editText}
        </Button>
      </div>
    )}
    <h4 className='h4 margin-top-bottom-10'>
      {title}
    </h4>
    <p className='para'>
      {description}
    </p>
  </div>
)

Introduction.defaultProps = {
  imageName: contactCenterIntroduction.imageName,
  rating: contactCenterIntroduction.rating,
  imageSrc: contactCenterIntroduction.imageSrc,
  name: contactCenterIntroduction.name,
  location: contactCenterIntroduction.location,
  date: contactCenterIntroduction.date,
  title: contactCenterIntroduction.title,
  description: contactCenterIntroduction.description,
  isEdit: false,
  editText: '',
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
  isEdit: PropTypes.bool,
  editText: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  handleEditModal: PropTypes.func,
}

export default Introduction
