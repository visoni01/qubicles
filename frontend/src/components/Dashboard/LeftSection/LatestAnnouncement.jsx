import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../utils/common'
// import './style.scss'

const LatestAnnouncement = () => {
  const { isLoading, announcements } = useSelector((state) => state.announcement)
  return (
    <Box className='box'>
      <div className='announcement-section'>
        <h3 className='heading'>
          Latest Announcements
        </h3>
        <ul className='announcement-list'>
          {!isLoading && announcements.map(({ date, title, id }) => (
            <li key={ `${ id }` } className='announcement-item'>
              <span className='date'>
                <b>{formatDate(date)}</b>
              </span>
              <p className='text'>
                {title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  )
}

export default LatestAnnouncement
