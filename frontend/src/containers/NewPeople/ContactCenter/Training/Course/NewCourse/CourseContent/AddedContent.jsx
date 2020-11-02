import React from 'react'
import {
  Grid, Input, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function AddedContent() {
  return (
    <div className='list-item'>
      <Grid container spacing={ 2 } justify='space-between'>
        <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
          <Grid className='article-icon' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
            <FontAwesomeIcon className='article-icon' icon={ faFileAlt } />
          </Grid>
          <Grid item className='unit-name' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
            <Input
              defaultValue='Unit 2'
              className='unit-name'
            />
          </Grid>
        </Grid>
        <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
          <span className='article'> Article </span>
          <IconButton>
            <FontAwesomeIcon className='delete-icon' icon={ faTrash } />
          </IconButton>
          <Button
            className='edit-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
