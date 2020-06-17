import React from 'react'

const Overview = ({ title, data }) => (
  <div className={'feed-channels card-background-color'}>
    <div className={'custom-header'}>
      {title}
    </div>
    <div className={'menu-items'}>
      {
        data.map(({ number, heading }, index) => {
          return (
            <div className={'mb-4 pd-11'} key={`${heading} ${title}`}>
              <span className={'custom-text'}> {number} </span>
              <span> {heading} </span>
            </div>
          )
        })
      }
    </div>
  </div>
)

export default Overview
