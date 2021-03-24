import React from 'react'
import { Button } from '@material-ui/core'
import CourseContentSection from './courseContentSection'
import './styles.scss'

const ContentSectionRoot = () => (
  <div className='content-section'>
    <CourseContentSection />
    <CourseContentSection />

    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Add Section
    </Button>
  </div>
)

export default ContentSectionRoot
