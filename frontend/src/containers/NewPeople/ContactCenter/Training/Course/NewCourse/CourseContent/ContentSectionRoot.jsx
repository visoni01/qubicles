import React from 'react'
import { Button } from '@material-ui/core'
import CourseContentSection from './CourseContentSection'
import './styles.scss'

export default function ContentSectionRoot() {
  return (
    <div className='content-section'>
      <CourseContentSection />
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
}
