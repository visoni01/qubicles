import React from 'react'
import { Rating } from '@material-ui/lab'
import PropTypes from 'prop-types'
import ViewSetSubRatings from './viewSubRatings'

const ViewAllRatings = ({
  totalAverageRating, totalAverageRaters, subRatingLabels, subRatingValues,
}) => (
  <div className='text-center'>
    <div className='display-inline-flex align-items-center'>
      <Rating
        name='average-rating'
        className='rating-star'
        classes={ { label: 'rating-star-label', root: 'font-size-50x' } }
        max={ 1 }
        readOnly
        precision={ 0.5 }
        value={ 1 }
      />
      <h3 className='h3 primary font-size-32x'>{totalAverageRating}</h3>
      <p className='ml-10 mb-5 para primary font-size-32x'>{`(${ totalAverageRaters })`}</p>
    </div>

    <ViewSetSubRatings
      rating={ subRatingValues }
      onlyView
      ratingLabels={ subRatingLabels }
    />
  </div>
)
ViewAllRatings.defaultProps = {
  subRatingValues: {},
  subRatingLabels: [],
}

ViewAllRatings.propTypes = {
  totalAverageRating: PropTypes.string.isRequired,
  totalAverageRaters: PropTypes.number.isRequired,
  subRatingLabels: PropTypes.arrayOf(PropTypes.any),
  subRatingValues: PropTypes.shape({}),
}

export default ViewAllRatings
