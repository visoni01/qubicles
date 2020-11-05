import React from 'react'
import {
  TextareaAutosize, Grid, Button, Divider, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CourseThumbnail from './CourseThumbnail'
import IntroVideo from './IntroVideo'
import CourseContent from './CourseContent/index'

export default function ContentTab() {
  return (
    <div className='mt-30'>
      <CourseThumbnail />
      <IntroVideo />
      <CourseContent />
    </div>
  )
}
