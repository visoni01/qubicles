import React from 'react'

const Announcement = ({ announcements }) => (
  <div className={'feed-channels card-background-color'}>
    <div className={'custom-header'}>
      Latest annoucements
    </div>
    {
      announcements.map(({ date, data}, index) => {
        return (
          <div className={'menu-items'} key={`${date}-${index}`}>
            <div className={'mb-22'}> 
              <div className={'mb-4'}> {date} </div>
              <div className={'mb-4 font-size-custom'}> 
                {data}
              </div> 
            </div>
          </div>
        )
      })
    }
  </div>
)

export default Announcement
