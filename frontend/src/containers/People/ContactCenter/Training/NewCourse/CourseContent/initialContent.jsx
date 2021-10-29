import React, { useState } from 'react'
import { Grid, Input, Button } from '@material-ui/core'
import AddArticleModal from './addArticleModal'

const InitialContent = () => {
  const [ openAddUnit, setOpenAddUnit ] = useState(false)

  return (
    <div className='list-item'>
      <Grid container spacing={ 2 } justify='space-between'>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 2 }>
          <Input
            defaultValue='Unit 1'
            className='text-edit'
          />
        </Grid>
        <Grid item>
          <Button
            className='upload-content-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ () => setOpenAddUnit(true) }
          >
            Add Content
          </Button>
        </Grid>
      </Grid>

      <AddArticleModal
        open={ openAddUnit }
        onClose={ () => setOpenAddUnit(false) }
        onSubmit={ () => setOpenAddUnit(false) }
      />
    </div>
  )
}

export default InitialContent
