import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'

const PersonCard = ({
  id, name, title, profilePic,
}) => (
  <div className='person-card' id={ id }>
    <div className='is-flex is-vcenter'>
      <Avatar className='profile-pic' alt={ name } src={ profilePic } />
      <div>
        <h4 className='h4 mb-5'>{name}</h4>
        <p className='para light'>{title}</p>
      </div>
    </div>
  </div>
)

PersonCard.defaultProps = {
  profilePic: '',
  title: '',
}

PersonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  profilePic: PropTypes.string,
}

export default PersonCard
