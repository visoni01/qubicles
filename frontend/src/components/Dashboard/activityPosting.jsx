import React from 'react'

const ActivityPosting = ({ title, data }) => (
  <div className={'feed-channels'}>
    <div className={'custom-header'}>
      {title}
    </div>
    {
      data.map(({ icon, heading, subHeading }, index) => {
        return (
          <div className={'menu-items'} key={`${heading}-${index}-${title}`}>
            <div className={'card-background-color'}>
              <div className={'mb-4 pd-11'}>
                <span className={'custom-icon'}> </span>
                <span> 
                  <span className={'font-size-custom'}> {heading} </span>
                  <div className={'sub-heading-size'}> {subHeading} </div>
                </span>
              </div>  
            </div>
          </div>  
        )
      })
    }
  </div>
)

export default ActivityPosting
