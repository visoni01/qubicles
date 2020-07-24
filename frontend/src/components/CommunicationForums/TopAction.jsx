import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TopAction = ({ icon }) => (
  <div className='top-action is-secondary'>
    <i className='material-icons'>
      <FontAwesomeIcon icon={ icon } />
    </i>
  </div>
)

TopAction.propTypes = {
  icon: PropTypes.shape({
    icon: PropTypes.array,
  }).isRequired,
}

export default TopAction
