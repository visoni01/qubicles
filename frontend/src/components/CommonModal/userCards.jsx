import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import UserCardItems from './userCardItems'
import TopCompanySkeleton from '../People/ContactCenter/SkeletonLoader/Common/topCompanySkeleton'

const UserCards = ({ isLoading, heading, userData }) => {
  if (isLoading) {
    return (
      <TopCompanySkeleton />
    )
  }

  return (
    <Box className='custom-box top-talent-root'>
      <h3 className='h3'>{heading}</h3>
      {userData && userData.length > 0
        ? userData.map((user) => (
          <UserCardItems
            key={ user.itemId }
            itemHeading={ user.itemHeading }
            itemPic={ user.itemPic }
            itemRating={ user.itemRating }
            itemLink={ user.itemLink }
            itemRoute={ user.itemRoute }
            itemSubHeading={ user.itemSubHeading ? user.itemSubHeading : '' }
          />
        ))
        : (
          <p className='para sz-lg mt-20'>
            No users available...
          </p>
        )}
    </Box>
  )
}

UserCards.defaultProps = {
  isLoading: false,
}

UserCards.propTypes = {
  isLoading: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  userData: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    itemHeading: PropTypes.string.isRequired,
    itemPic: PropTypes.string,
    itemRating: PropTypes.number,
    itemLink: PropTypes.string.isRequired,
    itemRoute: PropTypes.string.isRequired,
    itemSubHeading: PropTypes.string,
  })).isRequired,
}

export default UserCards
