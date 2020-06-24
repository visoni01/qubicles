import React from 'react'
import { useSelector } from 'react-redux'

const Announcement = () => {
  const { isLoading, announcements } = useSelector( ( state ) => state.announcement )

  return (
    <div className="feed-channels card-background-color">
      <div className="custom-header">
        Latest annoucements
      </div>
      {
        !isLoading && announcements.length && announcements.map( ( { date, data }, index ) => (
          <div className="menu-items" key={ `${ date }-${ index }` }>
            <div className="mb-22">
              <div className="mb-4">
                {date}
              </div>
              <div className="mb-4 font-size-custom">
                {data}
              </div>
            </div>
          </div>
        ) )
      }
    </div>
  )
}

export default Announcement
