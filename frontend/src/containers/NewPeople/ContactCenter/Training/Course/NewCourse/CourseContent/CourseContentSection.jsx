import React from 'react'
import { Grid } from '@material-ui/core'
import SectionOptions from './SectionOptions'
import InitialContent from './InitialContent'
import AddedContent from './AddedContent'

export default function CourseContentSection() {
  return (
    <div>
      <div className='list-sections border-1'>
        <div className='list-item'>
          <Grid container justify='space-between'>
            <Grid item>
              <span className='para'>
                <b> Section 1 </b>
              </span>
            </Grid>
            <Grid item>
              <span className='para'>1 Unit</span>
            </Grid>
          </Grid>
        </div>
        <InitialContent />
        <AddedContent />
      </div>
      <SectionOptions />
    </div>
  )
}
