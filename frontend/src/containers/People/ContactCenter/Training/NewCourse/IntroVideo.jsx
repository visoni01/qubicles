import React from 'react'
import { Button } from '@material-ui/core'

export default function IntroVideo() {
  return (
    <div className='content-tab-section list-divider'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Introduction Video </h3>
          <p className='para'>
            {`Choose an introduction video. This video will be accessible for everyone who is
                intrested in your course `}
          </p>
        </div>
        <div className='course-thumbnail-upload'>
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
