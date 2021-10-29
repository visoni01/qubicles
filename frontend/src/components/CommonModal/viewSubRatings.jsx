import React from 'react'
import { Grid } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import PropTypes from 'prop-types'

const ViewSetSubRatings = ({
  ratingLabels, rating, setRating, onlyView,
}) => (
  <Grid container spacing={ 3 }>
    {ratingLabels.map((item) => (
      <Grid key={ item.id } item lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 } classes={ { root: 'text-center' } }>
        <div className='display-inline-flex mt-20'>
          <img src={ item.icon } alt={ item.label } />
          <div className='ml-10 text-align-start'>
            <h3 className='h3 font-size-16x ml-10'>{ item.label }</h3>
            {onlyView
              ? (
                <Rating
                  name={ item.name }
                  className='rating-star'
                  classes={ { label: 'rating-star-label' } }
                  size='large'
                  readOnly
                  precision={ 0.5 }
                  value={ Number(rating[ item.name ]) }
                />
              ) : (
                <Rating
                  name={ item.name }
                  className='rating-star mt-5'
                  classes={ { label: 'rating-star-label' } }
                  size='large'
                  precision={ 1 }
                  value={ Number(rating[ item.name ]) }
                  onChange={ (_, val) => setRating((current) => ({ ...current, [ item.name ]: val })) }
                />
              )}
          </div>
        </div>
      </Grid>
    ))}
  </Grid>
)

ViewSetSubRatings.defaultProps = {
  onlyView: false,
  rating: {},
  setRating: () => {},
  ratingLabels: [],
}

ViewSetSubRatings.propTypes = {
  ratingLabels: PropTypes.arrayOf(PropTypes.shape({})),
  rating: PropTypes.shape({}),
  setRating: PropTypes.func,
  onlyView: PropTypes.bool,
}

export default ViewSetSubRatings
