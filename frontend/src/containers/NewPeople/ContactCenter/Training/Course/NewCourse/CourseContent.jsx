import React from 'react'
import {
  Button, Grid, Box, List, ListItem, ListItemText,
} from '@material-ui/core'

export default function CourseContent() {
  return (
    <div className='content-tab-section'>
      <div className='content-box'>
        <div className='info'>
          <h3> Course Content </h3>
          <p className='para'>
            {`Start building your course
            by creating sections, units and tests`}
          </p>
        </div>
        <div className='content-section'>
          <div className='list-sections'>
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
            <div className='list-item'>
              <Grid container>
                <Grid item>
                  <span className='para'> Unit 1</span>
                </Grid>
              </Grid>
              <Button
                className='upload-content-button'
                classes={ {
                  root: 'button-secondary-small',
                  label: 'button-secondary-small-label',
                } }
              >
                Add Content
              </Button>
            </div>
          </div>
          <div className='content-options'>
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Add Unit
            </Button>
            <Button
              className='wide-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
            >
              Add Test
            </Button>
          </div>
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
      </div>
    </div>
  )
}
