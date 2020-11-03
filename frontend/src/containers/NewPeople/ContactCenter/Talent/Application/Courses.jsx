import React from 'react'
import {
  Button, Divider,
} from '@material-ui/core'

const Courses = () => (
  <div className='custom-box resume-root has-fullwidth'>
    <h3 className='h3 is-fullwidth mb-20'> Courses </h3>
    <div className='display-inline-flex resume-section is-fullwidth'>
      <Button
        classes={ {
          root: 'MuiButtonBase-root button-primary-text bold',
          label: 'MuiButton-label button-primary-text-label',
        } }
      >
        How to talk to clients?
      </Button>
      <p className='para light mb-10'>Chris Porter, 2020</p>
      <p className='para'> 7, Feb 2020 - 24, Feb 2020</p>
      <Divider className='divider' />

      <Button
        classes={ {
          root: 'MuiButtonBase-root button-primary-text bold',
          label: 'MuiButton-label button-primary-text-label',
        } }
      >
        Email Communication
      </Button>
      <p className='para light mb-10'>Martha Riley, 2020</p>
      <p className='para'> 7, Feb 2020 - 24, Feb 2020</p>
      <Divider className='divider' />

      <Button
        classes={ {
          root: 'MuiButtonBase-root button-primary-text bold',
          label: 'MuiButton-label button-primary-text-label',
        } }
      >
        Managing Difficult Situation
      </Button>
      <p className='para light mb-10'>Roy Gordon, 2020</p>
      <p className='para'> 7, Feb 2020 - 24, Feb 2020</p>
    </div>
  </div>

)

export default Courses
