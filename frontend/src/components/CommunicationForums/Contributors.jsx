import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { USER_ROUTE } from '../../routes/routesPath'
import { ownerDetails } from './forumValidators'

const getAvatarAndProfilesData = ({ users, bubbles }) => {
  const usersData = users.slice(0, bubbles)
  const data = { avatars: [], usernames: [] }
  usersData.forEach((user, index) => {
    data.avatars.push(<img key={ user.userId } className='avatar' src={ user.profileImage } alt='' />)
    data.usernames.push(
      <Link to={ `${ USER_ROUTE }${ user.userId }` } key={ user.userId }>
        {user.userName}
        {index < bubbles - 2 && <nobr>, </nobr>}
      </Link>,
    )
  })
  return data
}

const Contributors = ({ users, bubbles, message }) => {
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
          {users.length > bubbles && (
          <nobr>
            and
            <div>
              {users.length - bubbles}
              more
            </div>
          </nobr>
          )}
        </span>
        <span>{message}</span>
      </div>
    </div>
  )
}

Contributors.defaultProps = {
  bubbles: 3,
  message: 'are moderating this channel',
}

Contributors.propTypes = {
  bubbles: PropTypes.number,
  message: PropTypes.string,
  users: PropTypes.arrayOf(ownerDetails).isRequired,
}

export default Contributors
