import React from 'react'
import { Grid, TextField, Select } from '@material-ui/core'

const TestQuestion = () => (
  <div>
    <div className='list-sections border-1'>
      <div className='list-item'>
        <Grid container justify='space-between' spacing={ 3 }>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <p className='para bold'>Your Question</p>
            <TextField
              className='is-fullwidth'
              margin='dense'
              variant='outlined'
              placeholder='Write your question here'
              multiline
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
            <p className='para bold'>Question Type</p>
            <Select
              margin='dense'
              variant='outlined'
              native
              className='mt-7 is-fullwidth'
              placeholder='Please select question type'
            >
              {[
                'Multiple Choice', 'Check Boxes', 'Paragraph', 'TextField', 'Scale',
              ].map((questionType) => (
                <option key={ questionType } value={ questionType } className='para sz-xl'>
                  {questionType}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>
)

export default TestQuestion
