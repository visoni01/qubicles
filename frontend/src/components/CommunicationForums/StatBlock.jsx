import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

const StatBlock = ({
  title, data, user, icon, type,
}) => (
  <div className='stat-block'>
    <div className='avatar'>
      { type === 'user' ? (<img className='avatar' src={ user.profileImage } alt='' />)
        : (
          <i>
            <FontAwesomeIcon icon={ icon } />
          </i>
        )}
    </div>
    <div className='stat-meta'>
      <span>{title}</span>
      <span>{data}</span>
    </div>
  </div>
)

const ownerDetails = PropTypes.shape({
  profileImage: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string,
})

StatBlock.defaultProps = {
  user: {
    profileImage: 'https://via.placeholder.com/150x150',
    userId: 0,
    userName: '',
  },
  icon: faLightbulb,
}

StatBlock.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  user: ownerDetails,
  icon: PropTypes.shape({
    icon: PropTypes.array,
  }),
  type: PropTypes.string.isRequired,
}

export default StatBlock
