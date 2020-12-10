import React from 'react'
import { Grid } from '@material-ui/core'
import OpenPositions from './OpenPositions'

export default function About() {
  return (
    <Grid container spacing={ 5 } direction='column'>
      <Grid item>
        <OpenPositions />
      </Grid>
    </Grid>
  )
}
