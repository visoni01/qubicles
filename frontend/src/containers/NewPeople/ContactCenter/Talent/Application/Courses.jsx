import React from 'react'
import {
  Button, Divider,
} from '@material-ui/core'

const Courses = () => (
  <div className='box courses-root has-fullwidth'>
    <h3 className='courses-heading mb-20'> Courses </h3>
    <div className='display-inline-flex course-section'>
      <Button className='text-button'> How to talk to clients? </Button>
      <p className='author'>Chris Porter, 2020</p>
      <p> 7, Feb 2020 - 24, Feb 2020</p>
      <Divider className='divider' />

      <Button className='text-button'> Email Communication </Button>
      <p className='author'>Martha Riley, 2020</p>
      <p> 7, Feb 2020 - 24, Feb 2020</p>
      <Divider className='divider' />

      <Button className='text-button'> Managing Difficult Situation </Button>
      <p className='author'>Roy Gordon, 2020</p>
      <p> 7, Feb 2020 - 24, Feb 2020</p>
    </div>
  </div>

)

export default Courses
