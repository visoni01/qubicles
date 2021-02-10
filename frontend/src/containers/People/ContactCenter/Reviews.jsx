import React from 'react'
import { Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'
import './styles.scss'

const Reviews = ({
  imageName,
  rating,
  imageSrc,
  reviewerName,
  position,
  review,
}) => (
  <>
    <div className='display-inline-flex pb-20 list-divider'>
      <Avatar className='profile-pic no-margin-top' alt={ imageName } src={ imageSrc } />
      <div className='candidate-info'>
        <p className='para bold'>{reviewerName}</p>
        <p className='para light'>{position}</p>
        <Rating
          className='rating-star no-margin'
          name='read-only'
          readOnly
          size='small'
          value={ rating }
          precision={ 1 }
        />
        <p className='para mt-5'>
          {review}
        </p>
      </div>
    </div>
  </>
)

Reviews.defaultProps = {
  imageName: 'carolin',
  rating: 5,
  imageSrc: 'C',
  reviewerName: 'Carolin Palmer',
  position: 'Customer Service Manager at Microsoft',
  review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
  typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
  versions of Lorem Ipsum.`,
}

Reviews.propTypes = {
  imageName: PropTypes.string,
  rating: PropTypes.number,
  imageSrc: PropTypes.string,
  reviewerName: PropTypes.string,
  position: PropTypes.string,
  review: PropTypes.string,
}

export default Reviews
