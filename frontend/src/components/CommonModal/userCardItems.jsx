import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'

const UserCardItems = ({
  itemHeading,
  itemPic,
  itemRating,
  itemLink,
  itemRoute,
  itemSubHeading,
}) => (
  <div className='top-talent list-divider'>
    <div className='display-inline-flex mb-10'>
      <Avatar className='profile-pic' alt={ itemHeading } src={ itemPic } />
      <div className='candidate-info'>
        <span className='h4'>{itemHeading}</span>
        <Rating
          className='rating-star'
          name='read-only'
          readOnly
          size='small'
          value={ itemRating }
          precision={ 0.5 }
        />
        <p className='para light'>
          {itemSubHeading}
        </p>
        <span
          className='primary-text-link'
        >
          <Link to={ itemRoute }>
            {itemLink}
          </Link>
        </span>
      </div>
    </div>
  </div>
)

UserCardItems.defaultProps = {
  itemPic: '',
  itemRating: null,
}

UserCardItems.propTypes = {
  itemHeading: PropTypes.string.isRequired,
  itemPic: PropTypes.string,
  itemRating: PropTypes.number,
  itemLink: PropTypes.string.isRequired,
  itemRoute: PropTypes.string.isRequired,
  itemSubHeading: PropTypes.string.isRequired,
}

export default UserCardItems
