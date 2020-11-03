import React from 'react'
import { Button } from '@material-ui/core'

export default function CourseThumbnail() {
  return (
    <div className='content-tab-section list-divider'>
      <div className='content-box'>
        <div className='info'>
          <h3 className='h3 mb-10'> Course Thumbnail</h3>
          <p className='para'>
            {`Choose a thumbnail image for
          your course (format 16:9) `}
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
            Choose Image
          </Button>
        </div>
      </div>
    </div>
  )
}
