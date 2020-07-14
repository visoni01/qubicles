import React from 'react'
import UserDescription from './talent'
import { talentData } from './data'

const Wrap = () => (
  talentData.map(({ title, users }) => (
    <div className='forum-container mt-10' key={ title }>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>{ title }</h3>
      </div>
      {/* Jobs */}
      {users.map((user) => (
        <UserDescription
          { ...user }
          key={ `${ user.id }-${ user.description }` }
        />
      ))}
    </div>
  )))

export default Wrap
