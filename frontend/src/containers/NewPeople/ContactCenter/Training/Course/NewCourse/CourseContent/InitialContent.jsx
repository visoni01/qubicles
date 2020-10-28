import React from 'react'
import { Grid, Input, Button } from '@material-ui/core'

export default function InitialContent() {
  return (
    <div className='list-item'>
      <Grid container spacing={ 2 } justify='space-between'>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 2 }>
          <Input
            defaultValue='Unit 1'
            className='unit-name'
          />
        </Grid>
        <Grid item>
          <Button
            className='upload-content-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Add Content
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
