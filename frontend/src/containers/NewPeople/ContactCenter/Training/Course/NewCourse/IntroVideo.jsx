import React from 'react'
import { Button } from '@material-ui/core'

export default function IntroVideo() {
  return (
    <div className='content-tab-section'>
      <div className='content-box'>
        <div className='info'>
          <h3> Introduction Video </h3>
          <p className='para'>
            {`Choose an introduction video. This video will be accessible for everyone who is
                intrested in your course `}
          </p>
        </div>
        <div className='upload'>
          <Button
            className='button-width'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Choose Video
          </Button>
        </div>
      </div>
    </div>
  )
}
