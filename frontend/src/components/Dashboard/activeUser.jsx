import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

const ActiveUser = () => {
  const { isLoading, activeUsers } = useSelector((state) => state.activeUser)
  if (activeUsers.length === 0) {
    return (
      <div className='feed-channels'>
        <div className='custom-header'>
          No one is currently online
        </div>
      </div>
    )
  } return (
    <div className='feed-channels'>
      <div className='custom-header'>
        Active Users
      </div>
      {
        !isLoading && activeUsers.map(({ userName, status }, index) => (
          <div className='menu-items' key={ `${ userName }-${ status }` }>
            <div className='card-background-color'>
              <div className='mb-4 pd-11'>
                <span className='custom-icon'>
                  <FontAwesomeIcon icon={ faUserCircle } className='icon-style' />
                </span>
                <span>
                  <span className='font-size-custom'>
                    {userName}
                  </span>
                  <div className='sub-heading-size'>
                    {status}
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ActiveUser
