import React from 'react'
import PropTypes from 'prop-types'

const getAvatarAndProfilesData = ({ users, bubbles }) => {
  const usersData = users.slice(0, bubbles)
  const data = { avatars: [], usernames: [] }
  usersData.forEach((user, index) => {
    data.avatars.push(<img key={ user.user_id } className='avatar' src={ user.profile_photo } alt='' />)
    data.usernames.push(<a key={ user.user_id }>{user.user_name}{index < bubbles-1 && <nobr>, </nobr>}</a>)
  })

  return data
}

const Contributors = ({ users=[], bubbles, message }) => {
  const { avatars, usernames } = getAvatarAndProfilesData({ users, bubbles })
  return (
    <div className='latest-posts'>
      <div className='avatars'>
        {avatars}
        {users.length > bubbles && (
          <div className='avatar'>
            <span>{` +${ users.length - bubbles }` }</span>
          </div>
        )}
      </div>
      <div className='latest-meta'>
        <span>
          {usernames}
          {users.length > bubbles && <nobr> and <a>{users.length - bubbles} more</a> </nobr>}
        </span>
        <span>{message}</span>
      </div>
    </div>
  )
}



Contributors.defaultProps = {
  bubbles: 3,
  message: 'are moderating this channel'
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
