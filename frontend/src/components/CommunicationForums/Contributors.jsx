import React from 'react'
import PropTypes from 'prop-types'

const Contributors = ({ users, message, bubbles }) => (
  // bubbles are number of face icons
  <>
    <div className='latest-posts'>
      <div className='avatars'>
        { users.slice(0, bubbles).map((user) => (
          <img key={ user.user_id } className='avatar' src={ user.profile_photo } alt='' />
        ))}
        {users.length > 3 && (
          <div className='avatar'>
            <span>{`+${ users.length - bubbles }` }</span>
          </div>
        )}
      </div>
      <div className='latest-meta'>
        <span>
          {users.slice(0, bubbles).map((user, index) => (
            <a key={ user.user_id }>{user.user_name}{index < bubbles-1 && <nobr>, </nobr>}</a>
          ))
          }
          {users.length > 3 && <nobr> and <a>{users.length - bubbles} more</a> </nobr>}
        </span>
        <span>{message}</span>
      </div>
    </div>
  </>
)

Contributors.defaultProps = {
  bubbles: 3,
}

Contributors.propTypes = {
  bubbles: PropTypes.number,
  message: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired,
    profile_photo: PropTypes.string,
  })).isRequired,
}

export default Contributors
