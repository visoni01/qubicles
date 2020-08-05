import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import { formatDate } from '../../utils/common'

const Announcement = () => {
  const { isLoading, announcements } = useSelector((state) => state.announcement)
  return (
    <div className='feed-channels'>
      <div className='custom-header'>
        Latest announcements
      </div>
      {
        !isLoading && announcements.length && announcements.map(({ date, title, id }, index) => (
          <div className='menu-items' key={ `${ id }` }>
            <div className='card-background-color'>
              <div className='mb-4 pd-11'>
                <span className='custom-date'>
                  {formatDate(date)}
                </span>
                <div className='custom-title'>
                  {title}
                </div>
              </div>
            </div>
          </div>
        ))
      }

      {
        isLoading
        && <Skeleton variant='rect' height={ 150 } />
      }
    </div>
  )
}

export default Announcement
