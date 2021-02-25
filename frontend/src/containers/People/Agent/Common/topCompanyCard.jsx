import React from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../../../routes/routesPath'

const TopCompanyCard = ({
  clientId,
  clientName,
  clientRating,
  clientPic,
  openPositions,
}) => (
  <div className='top-talent list-divider no-margin'>
    <div className='display-inline-flex mt-5 pb-5'>
      <Avatar className='profile-pic' alt={ clientName } src={ clientPic } />
      <div className='candidate-info'>
        <div className='is-fullwidth'>
          <span className='h4'>{clientName}</span>
          <Rating
            className='rating-star'
            name='read-only'
            readOnly
            size='small'
            value={ clientRating }
            precision={ 0.1 }
          />
        </div>
        <div className='is-fullwidth'>
          <span
            className='primary-text-link'
          >
            <Link to={ `${ PROFILE_ROUTE }/${ clientId }/about` }>
              {openPositions}
              {' '}
              open position
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
)

TopCompanyCard.defaultProps = {
  clientName: 'Lacus',
  clientRating: '5',
  clientPic: 'https://picsum.photos/200/300',
}

TopCompanyCard.propTypes = {
  clientId: PropTypes.number.isRequired,
  clientName: PropTypes.string,
  clientRating: PropTypes.number,
  clientPic: PropTypes.string,
  openPositions: PropTypes.number.isRequired,
}

export default TopCompanyCard
