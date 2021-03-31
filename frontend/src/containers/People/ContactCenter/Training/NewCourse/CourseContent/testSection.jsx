import React, { useState } from 'react'
import {
  Grid, Input, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faTrash } from '@fortawesome/free-solid-svg-icons'
import TestQuestionModal from './testQuestionModal'

const TestSection = () => {
  const [ openTest, setOpenTest ] = useState(false)
  return (
    <>
      <div className='list-item'>
        <Grid container spacing={ 2 } justify='space-between'>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 2 } container spacing={ 2 }>
            <Grid className='align-self-center' item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 }>
              <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faFlask } />
            </Grid>
            <Grid item className='text-edit' xl={ 10 } lg={ 10 } md={ 10 } sm={ 10 }>
              <Input
                defaultValue='Test'
                className='text-edit'
              />
            </Grid>
          </Grid>
          <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 10 } className='added-content'>
            <span className='para light margin-left-right-10'> Test </span>
            <IconButton>
              <FontAwesomeIcon className='custom-fa-icon sz-lg' icon={ faTrash } />
            </IconButton>
            <Button
              className='edit-button'
              classes={ {
                root: 'button-secondary-small',
                label: 'button-secondary-small-label',
              } }
              onClick={ () => setOpenTest(true) }
            >
              Questions
            </Button>
          </Grid>
        </Grid>
      </div>
      <TestQuestionModal
        open={ openTest }
        onClose={ () => setOpenTest(false) }
        onSubmit={ () => setOpenTest(false) }
      />
    </>
  )
}

export default TestSection
